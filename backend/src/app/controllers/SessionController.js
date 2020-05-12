import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).json({ error: 'Insira o email e a senha.' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Insira um email.' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Insira a senha.' });
    }

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    const { id, name, phone, avatar, provider, admin, banned } = user;

    if (banned) {
      return res.status(401).json({ error: 'Você foi banido da aplicação!' });
    }

    return res.json({
      user: {
        id,
        name,
        phone,
        email,
        provider,
        avatar,
        admin,
        banned,
      },
      token: jwt.sign(
        {
          id, // payload
        },
        authConfig.secret, // gerar texto no md5 online
        {
          expiresIn: authConfig.expiresIn,
        } // data de expiração
      ),
    });
  }

  async update(req, res) {
    const id = req.userId;

    const profile = await User.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'provider',
        'admin',
        'banned',
      ],
    });

    return res.json({
      token: jwt.sign(
        {
          id, // payload
        },
        authConfig.secret, // gerar texto no md5 online
        {
          expiresIn: authConfig.expiresIn,
        } // data de expiração
      ),
      profile,
    });
  }
}

export default new SessionController();
