import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      phone: Yup.string()
        .required()
        .matches(phoneRegExp, 'Phone number is not valid'),
    });

    // Se retornar false é pq o body não está valido e entra no if
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // Interrompe o fluxo se já existir um usuário
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider, phone } = await User.create(req.body);

    return res.json({ id, name, email, provider, phone });
  }

  // Usuário tem que estar logado
  async update(req, res) {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Se retornar false é pq o body não está valido e entra no if
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword, avatar_id } = req.body;

    // colocamos o id do user no middleware de auth para que possamos extrair ele a partir do req
    const user = await User.findByPk(req.userId);

    // Verifica se o email que está sendo alterado é diferente do email antigo
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // Verifica a senha antiga
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const checkAvatar = await File.findOne({
      where: { id: avatar_id },
    });

    // Verifica o avatar escolhido
    if (!(await checkAvatar)) {
      return res.status(400).json({ error: 'Avatar not found' });
    }

    const { id, name, provider, phone } = await user.update(req.body);

    return res.json({ id, name, email, provider, phone });
  }
}

export default new UserController();
