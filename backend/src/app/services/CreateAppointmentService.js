import {
  parseISO,
  format,
  isBefore,
  subMinutes,
  subDays,
  addDays,
} from 'date-fns';

import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

import AppError from '../errors/AppError';

import Notification from '../schemas/Notification';

class CreateAppointmentService {
  async run({ user_id, provider_id, date, cut_type }) {
    let hasAppointment = await Appointment.findOne({
      where: {
        user_id,
        date: {
          // Checando se existe um agendamento em menos de 6 dias do dia de hoje
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
      throw new AppError(
        `Você já possui um agendamento marcado com o provedor ${hasAppointment.provider.name} em menos de 7 dias.`
      );
    }

    // Checando se existe um agendamento 6 dias antes da data escolhida OU na data escolhida
    hasAppointment = await Appointment.findAll({
      where: {
        user_id,
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

    const userHasAnAppointmentClose = hasAppointment.find(
      e => e.past === false
    );

    if (userHasAnAppointmentClose) {
      throw new AppError(
        `Você já possui um agendamento marcado com o provedor ${userHasAnAppointmentClose.provider.name} próximo à data escolhida.`
      );
    }

    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      throw new AppError('Você só pode marcar com provedores.');
    }

    if (provider_id === user_id) {
      throw new AppError('Você não pode marcar com você mesmo.');
    }

    if (!cut_type) {
      throw new AppError('Insira o serviço.');
    }

    if (isBefore(parseISO(date), new Date())) {
      throw new AppError('Horários que já passaram não são permitidos.');
    }

    const checkAnyAppointmentInSameTime = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: parseISO(date) },
    });

    if (checkAnyAppointmentInSameTime) {
      throw new AppError('Data do agendamento não está disponível.');
    }

    const checkAppointmentHalfAnHourBefore = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: subMinutes(parseISO(date), 30),
        cut_type: 'corte e barba',
      },
    });

    if (checkAppointmentHalfAnHourBefore) {
      throw new AppError('Data do agendamento não está disponível.');
    }

    const cost = cut_type === 'corte' ? '25.00' : '35.00';

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date: parseISO(date),
      cut_type,
      cost,
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(user_id);

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

    return appointment;
  }
}

export default new CreateAppointmentService();
