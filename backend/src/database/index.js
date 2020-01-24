/*
  Realizar a conexão com o banco de dados e carregar os models
*/

import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Appoitment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appoitment];

class Database {
  constructor() {
    this.init();
  }

  // carreagar os models e fazer a conexão com a DB
  init() {
    this.connection = new Sequelize(databaseConfig);

    // percorrer todos os models e chamar o método init();
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
