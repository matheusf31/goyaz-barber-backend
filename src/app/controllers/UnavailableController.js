import Available from '../models/Available';

class Unavailable {
  async store(req, res) {
    const { date } = req.body;
    const provider_id = req.userId;

    const checkExistUnavailable = await Available.findOne({
      where: {
        provider_id,
        date,
      },
    });

    if (checkExistUnavailable) {
      checkExistUnavailable.unavailable = true;
      await checkExistUnavailable.save();

      return res.json({ ok: true });
    }

    const response = await Available.create({
      date,
      provider_id,
      unavailable: true,
    });

    return res.json(response);
  }

  async update(req, res) {
    const { date } = req.body;
    const provider_id = req.userId;

    const available = await Available.findOne({
      where: {
        date,
        provider_id,
      },
    });

    if (available) {
      available.unavailable = false;
      await available.save();
    } else {
      await Available.create({
        date,
        provider_id,
        unavailable: false,
      });
    }

    return res.json({ ok: true });
  }
}

export default new Unavailable();
