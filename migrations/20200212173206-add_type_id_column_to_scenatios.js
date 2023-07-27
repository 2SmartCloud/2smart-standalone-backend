// eslint-disable-next-line import/no-commonjs
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Scenarios', 'typeId', { type: Sequelize.INTEGER, allowNull: true, references: { model: 'SimpleScenarioTypes', key: 'id' } });
  },
  // eslint-disable-next-line no-unused-vars
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Scenarios', 'typeId');
  }
};