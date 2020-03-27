import { startOfMonth, endOfMonth } from 'date-fns';
import { Op } from 'sequelize';

import Concluded from '../models/Concluded';
import Appointment from '../models/Appointment';

class ConcludedController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    // Filtrando por mês
    const searchDate = Number(date);

    const appointments = await Concluded.findAll({
      where: {
        provider_id: req.userId,
        date: {
          [Op.between]: [startOfMonth(searchDate), endOfMonth(searchDate)],
        },
      },
      attributes: ['id', 'date', 'cut_type', 'cost', 'user_id', 'provider_id'],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(401).json({ error: 'Agendamento não encontrado' });
    }

    appointment.concluded = true;

    appointment.save();

    const concluded = await Concluded.create({
      appointment_id: id,
      user_id: appointment.user_id,
      provider_id: appointment.provider_id,
      date: appointment.date,
      cut_type: appointment.cut_type,
      cost: appointment.cost,
    });

    if (!concluded) {
      return res
        .status(500)
        .json({ error: 'Erro inesperado, contate o desenvolvedor' });
    }

    return res.json(concluded);
  }
}

export default new ConcludedController();
