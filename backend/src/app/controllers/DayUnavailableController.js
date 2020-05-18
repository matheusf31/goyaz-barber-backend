import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';

import Available from '../models/Available';

class DayUnavailableController {
  async store(req, res) {
    const provider_id = req.userId;
    const { date } = req.query;

    const searchDate = Number(date);

    const checkUnavailable = await Available.findAll({
      where: {
        provider_id,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      attributes: ['id', 'date', 'unavailable'],
    });

    /**
     * PERIGOSO (TENTAR REFATORAR)
     */
    if (checkUnavailable) {
      checkUnavailable.forEach(async e => {
        if (e.unavailable === false) {
          await Available.update(
            { unavailable: true },
            {
              where: {
                id: e.id,
              },
            }
          );
        }
      });
    }

    const checkDayUnavailable = await Available.findOne({
      where: {
        provider_id,
        date: startOfDay(searchDate),
      },
    });

    if (checkDayUnavailable) {
      checkDayUnavailable.day_busy = true;
      await checkDayUnavailable.save();

      return res.json({ ok: true });
    }

    const response = await Available.create({
      provider_id,
      date: startOfDay(searchDate),
      day_busy: true,
    });

    return res.json(response);
  }

  async delete(req, res) {
    const provider_id = req.userId;
    const { date } = req.query;

    const searchDate = Number(date);

    const checkUnavailable = await Available.findAll({
      where: {
        provider_id,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      attributes: ['id', 'date', 'unavailable'],
    });

    if (checkUnavailable) {
      checkUnavailable.forEach(async e => {
        if (e.unavailable === true) {
          await Available.update(
            { unavailable: false },
            {
              where: {
                id: e.id,
              },
            }
          );
        }
      });
    }

    const checkDayUnavailable = await Available.findOne({
      where: {
        provider_id,
        date: startOfDay(searchDate),
      },
    });

    if (checkDayUnavailable) {
      checkDayUnavailable.day_busy = false;
      await checkDayUnavailable.save();

      return res.json({ ok: true });
    }

    const response = await Available.create({
      provider_id,
      date: startOfDay(searchDate),
      day_busy: false,
    });

    return res.json(response);
  }
}

export default new DayUnavailableController();
