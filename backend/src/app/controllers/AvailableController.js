import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  isSaturday,
  isSunday,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      attributes: [
        'id',
        'date',
        'cut_type',
        'cost',
        'past',
        'cancelable',
        'concluded',
        'client_name',
      ],
      include: [
        {
          model: User, // para retornar os dados do relacionamento
          as: 'user', // qual dos relacionamentos
          attributes: ['name', 'phone'], // quais atributos que quero buscar
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

    const cutType = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      attributes: ['date', 'cut_type'],
    });

    /** todos os horários disponíveis do prestador */
    const schedule = [];

    if (isSunday(searchDate)) {
      return res.status(400).json({ error: 'Data indisponível.' });
    }

    if (isSaturday(searchDate)) {
      schedule.push(
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00'
      );
    } else {
      schedule.push(
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '13:30',
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
        '19:00'
      );
    }

    /**
     * Verificando se o horário não passou ou se está ocupado
     */
    const scheduleAvailable = schedule.map(time => {
      const [hour, minute] = time.split(':');

      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      let cut_type;
      const findCutType = cutType.find(a => format(a.date, 'HH:mm') === time);

      if (findCutType) {
        cut_type = findCutType.cut_type;
      }

      /** available será um vetor com vários objetos */
      return {
        time, // 08:00 (mostrar no front qual a hora disp)
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
        cut_type,
        appointment: appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    // percorrer available procurando o cut_type === 'corte e barba' e setando o próximo horário como available = false
    for (let i = 0; i < scheduleAvailable.length; i++) {
      if (scheduleAvailable[i].cut_type === 'corte e barba') {
        scheduleAvailable[i + 1].available = false;
      }
    }

    return res.json(scheduleAvailable);
  }
}

export default new AvailableController();
