/*
  Para conseguir manipular os dados (criar usuários, deletar, etc)
*/

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/*
  Os campos dentro do model não precisam ser um reflexo
  dos campos dentro da base de dados
*/
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // VIRTUAL -> um campo que nunca vai existir na base de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /* 
      beforeSave: antes de qualquer usuário ser salvo na DB esse trecho
      de código será executado de forma automática
    */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    // retorna o model que acabou de ser inicializado
    return this;
  }
}

export default User;