module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('appointments', 'client_name', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('appointments', 'client_name');
  },
};
