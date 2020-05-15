import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id', 'phone'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }

  async store(req, res) {
    const { name, email, password, phone } = req.body;
    const reg = /^(62|062)(\d{4,5}\-?\d{4})$/;
    const reg2 = /\-/;

    let phoneFormatted = '';

    if (!phone) {
      return res.status(400).json({ error: 'Insira seu número de telefone.' });
    }

    const match = phone.match(reg);
    const match2 = phone.match(reg2);

    if (match2 && phone.length > 13) {
      return res.status(400).json({ error: 'Número de telefone inválido' });
    }

    if (!match2 && phone.length > 12) {
      return res.status(400).json({ error: 'Número de telefone inválido' });
    }

    if (!match) {
      return res.status(400).json({ error: 'Número de telefone inválido' });
    }

    if (match2) {
      phoneFormatted = phone;
    } else {
      phoneFormatted = `${phone.substr(0, phone.length - 4)}-${phone.substr(
        phone.length - 4
      )}`;
    }

    const userIsProvider = await User.findByPk(req.userId);

    if (!userIsProvider.provider) {
      return res.status(401).json({ error: 'Você não é um provedor' });
    }

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const provider = await User.create({
      name,
      email,
      password,
      provider: true,
      phone: phoneFormatted,
    });

    return res.json(provider);
  }
}

export default new ProviderController();
