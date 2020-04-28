import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appoitment from '../app/models/Appointment';
import Concluded from '../app/models/Concluded';
import Available from '../app/models/Available';

import databaseConfig from '../config/database';

const models = [User, File, Appoitment, Concluded, Available];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // carreagar os models e fazer a conexão com a DB
  init() {
    this.connection = new Sequelize(databaseConfig);

    // percorrer todos os models e chamar o método init();
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
