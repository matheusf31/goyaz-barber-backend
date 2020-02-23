/*
  Novo controler pois estamos criando uma sessão
  Pensar sempre na entidade que estamos tratando no momento
  Só podemos ter 1 dos 5 métodos (index, store, show, delete, update)
*/

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    // busca usuário com o email inserido
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
      return res.status(401).json({ error: 'User not found' });
    }

    // se a senha não bater entra no if
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, avatar, provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
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
}

export default new SessionController();
