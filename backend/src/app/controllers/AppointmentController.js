import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import { check } from 'prettier';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // Checando se provider_id é um provedor
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(400)
        .json({ error: 'You can only appointment with providers ' });
    }

    /* 
      parseISO vai transformar a string passada no req.body em um objeto DATE
      startOfHower vai pegar apenas o início da hora
      OBSERVAÇÃO: PROVAVELMENTE TEREI QUE ALTERAR ESSA LINHA PARA SE ENCAIXAR COM OS HORÁRIOS DO THIADO
    */

    // Checando se a data/hora escolhida está ANTES da data/hora atual
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    // Checando se o provedor já não tem um agendamento marcado pro mesmo horário
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // Como passou todas as verificações vou criar o agendamento na DB
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
