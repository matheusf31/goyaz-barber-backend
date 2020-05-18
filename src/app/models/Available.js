import Sequelize, { Model } from 'sequelize';

class Available extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        unavailable: Sequelize.BOOLEAN,
        day_busy: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Available;
