import {
  parseISO,
  format,
  isBefore,
  subHours,
  subMinutes,
  subDays,
  addDays,
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
    // Usuário que fez o agendamento
    let appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: [['id', 'DESC']],
      attributes: [
        'id',
        'date',
        'cut_type',
        'past',
        'cancelable',
        'cost',
        'concluded',
      ],
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

    appointments = appointments.filter(
      e => e.past === false || e.concluded === true
    );

    return res.json(appointments);
  }

  async store(req, res) {
    const { provider_id, date, cut_type } = req.body;

    // Checando se existe um agendamento em menos de 6 dias do dia de hoje
    let hasAppointment = await Appointment.findOne({
      where: {
        user_id: req.userId,
        date: {
          [Op.between]: [new Date(), addDays(new Date(), 6)],
        },
        canceled_at: null,
      },
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'phone'],
        },
      ],
    });

    if (hasAppointment) {
      return res.status(400).json({
        error: `Você já possui um agendamento marcado com o provedor ${hasAppointment.provider.name} em menos de 7 dias.`,
      });
    }

    // checar se existe um agendamento 6 dias antes da data escolhida
    hasAppointment = await Appointment.findAll({
      where: {
        user_id: req.userId,
        date: {
          [Op.between]: [subDays(parseISO(date), 6), parseISO(date)],
        },
        canceled_at: null,
      },
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'phone'],
        },
      ],
      attributes: [
        'id',
        'date',
        'cut_type',
        'cost',
        'past',
        'cancelable',
        'concluded',
        'past',
      ],
    });

    const hasOneAppointment = hasAppointment.find(e => e.past === false);

    if (hasOneAppointment) {
      return res.status(400).json({
        error: `Você já possui um agendamento marcado com o provedor ${hasAppointment.provider.name} em menos de 7 dias.`,
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
    if (isBefore(parseISO(date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Horários que já passaram não são permitidos.' });
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
    const formatedDate = format(
      parseISO(date),
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

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
