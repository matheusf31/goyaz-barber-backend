/*
  Novo controler pois estamos criando uma sessão
  Pensar sempre na entidade que estamos tratando no momento
  Só podemos ter 1 dos 5 métodos (index, store, show, delete, update )
*/

import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // para se autenticar precisa do email e senha
    const { email, password } = req.body;

    // existe user com esse email?
    const user = await User.findOne({ where: { email } });

    // se não houver usuário com o email inserido entra no if
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // se a senha não bater entra no if
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
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
