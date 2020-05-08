import * as Yup from 'yup';

import User from '../models/User';
import ResetPassword from '../models/ResetPassword';

import ResetPasswordMail from '../jobs/ResetPasswordMail';
import Queue from '../../lib/Queue';

import generateRandomString from '../../util/generateRandomString';

class PasswordReset {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não foi encontrado.' });
    }

    const randomToken = `${user.id}.${generateRandomString(5)}`;

    const tokenExist = await ResetPassword.findOne({
      where: {
        user_id: user.id,
      },
    });

    if (tokenExist) {
      await tokenExist.destroy();
    }

    const token = await ResetPassword.create({
      user_id: user.id,
      token: randomToken,
    });

    await Queue.add(ResetPasswordMail.key, {
      user,
      randomToken,
    });

    return res.json(token);
  }

  async update(req, res) {
    const { token, newPassword, confirmPassword } = req.body;

    const tokenExist = await ResetPassword.findOne({
      where: {
        token,
      },
    });

    if (!tokenExist) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const schema = Yup.object().shape({
      newPassword: Yup.string().min(6),
      confirmPassword: Yup.string().when('newPassword', (newPassword, field) =>
        newPassword ? field.required().oneOf([Yup.ref('newPassword')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na senha.' });
    }

    const user = await User.findByPk(tokenExist.user_id);

    await user.update({
      password: newPassword,
    });

    await tokenExist.destroy();

    return res.json(user);
  }
}

export default new PasswordReset();
