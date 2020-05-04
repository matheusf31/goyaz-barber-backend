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
      order: [['id', 'ASC']],
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
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const { name, phone, email, password } = req.body;

    /**
     * Números válidos: 06299999-9999 // 0629999-9999 // 62999999-9999 // 629999-9999 // 062999999999 // 06299999999 // 62999999999 // 6299999999
     */
    // eslint-disable-next-line no-useless-escape
    const reg = /^(62|062)(\d{4,5}\-?\d{4})$/;

    // Para verificar se há o hífen entre os números
    // eslint-disable-next-line no-useless-escape
    const reg2 = /\-/;

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

    let phoneFormatted = '';

    // formatar o phone para salvar com hífen no banco de dados
    if (match2) {
      phoneFormatted = phone;
    } else {
      phoneFormatted = `${phone.substr(0, phone.length - 4)}-${phone.substr(
        phone.length - 4
      )}`;
    }

    const { id, provider } = await User.create({
      name,
      email,
      password,
      phone: phoneFormatted,
    });

    return res.json({ id, name, email, provider, phoneFormatted });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
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

    let phoneFormatted = '';

    const { name, phone, email, password, oldPassword, avatar_id } = req.body;

    /**
     * Números válidos: 06299999-9999 // 0629999-9999 // 62999999-9999 // 629999-9999 // 062999999999 // 06299999999 // 62999999999 // 6299999999
     */
    // eslint-disable-next-line no-useless-escape
    const reg = /^(62|062)(\d{4,5}\-?\d{4})$/;

    // Para verificar se há o hífen entre os números
    // eslint-disable-next-line no-useless-escape
    const reg2 = /\-/;

    if (phone) {
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

      // formatar o phone para salvar com hífen no banco de dados
      if (match2) {
        phoneFormatted = phone;
      } else {
        phoneFormatted = `${phone.substr(0, phone.length - 4)}-${phone.substr(
          phone.length - 4
        )}`;
      }
    }

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

    await user.update({
      name,
      email,
      phone: phoneFormatted || undefined,
      password,
    });

    const { id, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, avatar, phoneFormatted });
  }
}

export default new UserController();
