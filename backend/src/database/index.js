/*
  Realizar a conexão com o banco de dados e carregar os models
*/

import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // carreagar os models e fazer a conexão com a DB
  init() {
    this.connection = new Sequelize(databaseConfig);

    // percorrer todos os models e chamar o método init();
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
