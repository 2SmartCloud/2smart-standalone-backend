// eslint-disable-next-line import/no-commonjs
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('SimpleScenarioTypes', 'language', { type: Sequelize.ENUM('JS'), defaultValue: 'JS' });
  },
  // eslint-disable-next-line no-unused-vars
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('SimpleScenarioTypes', 'language');
  }
};