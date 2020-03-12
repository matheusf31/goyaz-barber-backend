import Concluded from '../models/Concluded';
import Appointment from '../models/Appointment';

class ConcludedController {
  async store(req, res) {
    const { appointment_id } = req.body;

    const appointment = await Appointment.findByPk(appointment_id);

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
