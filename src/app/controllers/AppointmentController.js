import { isBefore, subHours } from 'date-fns';

import Appointment from '../models/Appointment';
import File from '../models/File';
import User from '../models/User';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

import CreateAppointmentService from '../services/CreateAppointmentService';

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
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'phone'],
          include: [
            {
              model: File,
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
    try {
      const { provider_id, date, cut_type } = req.body;

      const appointment = await CreateAppointmentService.run({
        user_id: req.userId,
        provider_id,
        date,
        cut_type,
      });

      return res.json(appointment);
    } catch (err) {
      return res.status(err.statusCode).json({ error: err.message });
    }
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

    // await Queue.add(CancellationMail.key, {
    //   appointment,
    // });

    return res.json(appointment);
  }
}

export default new AppointmentController();
