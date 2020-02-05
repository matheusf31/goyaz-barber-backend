import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    // exemplo 2018-06-23 17:59:33
    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    /** todos os horários disponíveis do prestador */
    /** podemos colocar os horários em uma tabela pro prestador escolher (fazer isso na aplicação) */
    const schedule = [
      '9:00', // exemplo 2018-06-23 08:00:00
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
    ];

    const available = schedule.map(time => {
      /** 2 verificações: ja não passou ou se não está ocupado */
      const [hour, minute] = time.split(':');

      /** setMinutes(poderia ser 30) */
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      /** available será um vetor com vários objetos */
      return {
        time, // 08:00 (mostrar no front qual a hora disp)
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
