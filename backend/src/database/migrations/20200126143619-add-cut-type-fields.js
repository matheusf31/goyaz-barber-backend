module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'appointments',
          'cut',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'appointments',
          'cut_and_beard',
          {
            type: Sequelize.BOOLEAN,
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: queryInterface => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('appointments', 'cut', { transaction: t }),
        queryInterface.removeColumn('appointments', 'cut_and_beard', {
          transaction: t,
        }),
      ]);
    });
  },
};
