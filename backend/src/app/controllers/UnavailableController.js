import Available from '../models/Available';

class Unavailable {
  /**
   * Cria um campo na tabela Available que mostra os horários onde o provedor não está disponível
   */
  async store(req, res) {
    const { date } = req.body;
    const provider_id = req.userId;

    const checkExistUnavailable = await Available.findOne({
      where: {
        provider_id,
        date,
      },
    });

    // se ele já existir eu coloco apenas unavailable como true
    if (checkExistUnavailable && !checkExistUnavailable.unavailable) {
      checkExistUnavailable.unavailable = true;
      checkExistUnavailable.save();

      return res.json({ ok: true });
    }

    const response = await Available.create({
      date,
      provider_id,
      unavailable: true,
    });

    return res.json(response);
  }

  async delete(req, res) {
    const { date } = req.query;
    const provider_id = req.userId;

    const available = await Available.findOne({
      where: {
        date,
        provider_id,
      },
    });

    if (available) {
      available.unavailable = false;
      available.save();
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
