import Sequelize, { Model } from 'sequelize';

class ResetPassword extends Model {
  static init(sequelize) {
    super.init(
      {
        token: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default ResetPassword;
