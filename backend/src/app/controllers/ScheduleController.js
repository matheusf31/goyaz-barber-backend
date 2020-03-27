/**
 * Listar os agendamentos para o provedor (específico para ele)
 */

import { startOfMonth, endOfMonth, parseISO, addMinutes } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  /**
   * Listar agendamentos do mês
   */
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'Usuário não é um provedor' });
    }

    const { date } = req.query;

    // Pegar apenas o dia do date
    const parsedDate = parseISO(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfMonth(parsedDate), endOfMonth(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'phone'],
        },
      ],
      order: ['date'],
    });

    return res.json(appointment);
  }

  /**
   * Provedor fazer agendamento manual
   */
  async store(req, res) {
    const { date, cut_type, email } = req.body;
    const provider_id = req.userId;
    let { client_name } = req.body;

    let user_id = null;

    if (!client_name && !email) {
      return res.status(400).json({ error: 'Insira um nome ou um email.' });
    }

    if (email) {
      const user = await User.findOne({ where: { email } });

      if (user) {
        user_id = user.id;
        client_name = user.name;
      } else {
        return res.status(400).json({
          error:
            'Usuário não encontrado, insira outro email ou apenas um nome.',
        });
      }
    } else if (!client_name) {
      return res.status(400).json({ error: 'Insira um nome ou um email' });
    }

    // Checando se o cut type foi inserido
    if (!cut_type) {
      return res.status(400).json({ error: 'Insira o tipo de corte.' });
    }

    const checkAvailable = await Appointment.findOne({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: addMinutes(parseISO(date), 30),
      },
    });

    if (checkAvailable) {
      return res
        .status(400)
        .json({ error: 'Horário indisponível para corte e barba.' });
    }

    const cost = cut_type === 'corte' ? '25,00' : '35:00';

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date: parseISO(date),
      cut_type,
      cost,
      client_name,
    });

    if (!appointment) {
      return res
        .status(500)
        .json({ error: 'Ocorreu algum erro. Avise o programador.' });
    }

    return res.json(appointment);
  }
}

export default new ScheduleController();
