import * as Yup from 'yup';
import User from '../models/User';
import Concluded from '../models/Concluded';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      where: {
        provider: false,
      },
      attributes: [
        'id',
        'name',
        'email',
        'phone',
        'concluded_appointments',
        'banned',
      ],
    });

    // para cada usuário eu vejo quantos agendamentos concluidos existem com o ID daquele usuário
    // https://medium.com/@oieduardorabelo/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0
    const promises = users.map(async user => {
      const total = await Concluded.findAll({ where: { user_id: user.id } });

      if (total) {
        user.concluded_appointments = total.length;
      }
    });

    await Promise.all(promises);

    return res.json(users);
  }

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
        .matches(phoneRegExp, 'Número de telefone inválido'),
    });

    // Se retornar false é pq o body não está valido e entra no if
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Verifique seus dados.' });
    }

    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // Interrompe o fluxo se já existir um usuário
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const { id, name, email, provider, phone } = await User.create(req.body);

    return res.json({ id, name, email, provider, phone });
  }

  async update(req, res) {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().matches(phoneRegExp, 'Número de telefone inválido.'),
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
      return res.status(400).json({ error: 'Erro no formato dos dados.' });
    }

    const { email, oldPassword, avatar_id } = req.body;

    // colocamos o id do user no middleware de auth para que possamos extrair ele a partir do req
    const user = await User.findByPk(req.userId);

    // Verifica se o email que está sendo alterado é diferente do email antigo
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }

    // Verifica a senha antiga
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga incorreta.' });
    }

    if (avatar_id) {
      const checkAvatar = await File.findOne({
        where: { id: avatar_id },
      });

      // Verifica o avatar escolhido
      if (!(await checkAvatar)) {
        return res.status(400).json({ error: 'Avatar não encontrado!' });
      }
    }

    await user.update(req.body);

    const { id, name, avatar, phone } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar, phone });
  }
}

export default new UserController();
