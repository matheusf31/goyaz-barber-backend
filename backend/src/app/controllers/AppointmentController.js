import {
  startOfHour,
  parseISO,
  isBefore,
  format,
  subHours,
  addMinutes,
  compareAsc,
  subMinutes,
  subWeeks,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import File from '../models/File';
import User from '../models/User';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // Usuário que fez o agendamento
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20, // pular (ou não) 20 registros para listar apenas 20
      attributes: ['id', 'date', 'cut_type', 'past', 'cancelable', 'cost'],
      include: [
        {
          model: User, // para retornar os dados do relacionamento
          as: 'provider', // qual dos relacionamentos
          attributes: ['id', 'name', 'phone'], // quais atributos que quero buscar
          include: [
            {
              model: File, // para retornar o avatar do provedor
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const { provider_id, date, cut_type } = req.body;

    const twoWeeksBack = subWeeks(parseISO(date), 2);

    const hasAppointment = await Appointment.findOne({
      where: {
        user_id: req.userId,
        date: {
          [Op.between]: [twoWeeksBack, date],
        },
        canceled_at: null,
      },
    });

    if (hasAppointment) {
      return res.status(400).json({
        error: 'Você possui um agendamento marcado nas últimas duas semanas',
      });
    }

    // Checando se provider_id é um provedor
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Você só pode marcar com provedores.' });
    }

    // Checando se o provider não é o mesmo usuário
    if (provider_id === req.userId) {
      return res.status(401).json({
        error: 'Você não pode marcar com você mesmo.',
      });
    }

    // Checando se o cut type foi inserido
    if (!cut_type) {
      return res.status(400).json({ error: 'Insira o serviço.' });
    }

    // Checando se a data/hora escolhida está ANTES da data/hora atual
    const hourStart = startOfHour(parseISO(date));
    const halfHour = addMinutes(hourStart, 30);

    if (compareAsc(parseISO(date), hourStart) === 0) {
      if (isBefore(hourStart, new Date())) {
        return res
          .status(400)
          .json({ error: 'Horários que já passaram não são permitidos.' });
      }
    }

    if (compareAsc(parseISO(date), halfHour) === 0) {
      if (isBefore(halfHour, new Date())) {
        return res
          .status(400)
          .json({ error: 'Horários que já passaram não são permitidos.' });
      }
    }

    // Checando se o provedor já não tem um agendamento marcado pro mesmo horário
    let checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: parseISO(date) },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Data do agendamento não está disponível.' });
    }

    // Checar se o provedor não tem um 'corte e barba' 30 minutos antes desse horário
    checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: subMinutes(parseISO(date), 30),
        cut_type: 'corte e barba',
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Data do agendamento não está disponível.' });
    }

    // extrair o custo do serviço
    const cost = cut_type === 'corte' ? '25.00' : '35.00';

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: parseISO(date),
      cut_type,
      cost,
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(req.userId);
    const formatedDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    // Agendamentos só poderão ser cancelados com no máximo 1 horas de antecedência
    const dateWithSub = subHours(appointment.date, 1);

    if (
      isBefore(dateWithSub, new Date()) &&
      req.userId !== appointment.provider.id
    ) {
      return res.status(401).json({
        error:
          'Você só pode cancelar agendamentos que estão a mais de 1 hora do horário atual.',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
