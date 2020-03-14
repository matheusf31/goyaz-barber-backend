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

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        concluded: true,
        date: {
          [Op.between]: [startOfMonth(searchDate), endOfMonth(searchDate)],
        },
      },
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const { appointment_id } = req.body;

    const appointment = await Appointment.findByPk(appointment_id);

    if (!appointment) {
      return res.status(401).json({ error: 'Appointment not found' });
    }

    appointment.concluded = true;

    appointment.save();

    const concluded = await Concluded.create({
      appointment_id,
      user_id: appointment.user_id,
      provider_id: appointment.provider_id,
      date: appointment.date,
      cut_type: appointment.cut_type,
      cost: appointment.cost,
    });

    return res.json(concluded);
  }
}

export default new ConcludedController();
