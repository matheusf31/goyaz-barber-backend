import User from '../models/User';

class BanController {
  async store(req, res) {
    const { id } = req.params;

    if (Number(id) === req.userId) {
      return res.status(400).json({ error: 'Você não pode se banir!' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não foi encontrado' });
    }

    if (user.banned) {
      return res.status(400).json({ error: 'Usuário já foi banido' });
    }

    if (user.admin) {
      return res.status(400).json({ error: 'Usuário não pode ser banido' });
    }

    user.banned = true;

    user.save();

    const { name, email, provider, banned } = user;

    return res.json({ id, name, email, provider, banned });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não foi encontrado' });
    }

    if (Number(id) === req.userId) {
      return res.status(400).json({ error: "Você não pode se 'desbanir'!" });
    }

    user.banned = false;

    user.save();

    const { name, email, provider, banned } = user;

    return res.json({ id, name, email, provider, banned });
  }
}

export default new BanController();
