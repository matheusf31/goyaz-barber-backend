module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'concluded_appointments', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'concluded_appointments');
  },
};
