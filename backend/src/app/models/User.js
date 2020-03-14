/*
  Para conseguir manipular os dados (criar usuários, deletar, etc)
*/

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// Os campos dentro do model não precisam ser um reflexo dos campos dentro da base de dados
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
        phone: Sequelize.STRING,
        banned: Sequelize.BOOLEAN,
        concluded_appointments: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    /* 
      beforeSave: antes de qualquer usuário ser salvo na DB esse trecho
      de código será executado de forma automática

      Criptográfa a senha
    */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // retorna o model que acabou de ser inicializado
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
