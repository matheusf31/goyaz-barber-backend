/**
 * Listar os agendamentos para o provedor (específico para ele)
 */

import { startOfMonth, endOfMonth, parseISO } from 'date-fns';
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
    return res.json({ ok: true });
  }
}

export default new ScheduleController();
