import Sequelize, { Model } from 'sequelize';

class Concluded extends Model {
  static init(sequelize) {
    super.init(
      {
        cut_type: Sequelize.STRING,
        cost: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
    this.belongsTo(models.Appointment, {
      foreignKey: 'appointment_id',
      as: 'appointment',
    });
  }
}

export default Concluded;
