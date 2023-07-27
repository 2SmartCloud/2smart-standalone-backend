// eslint-disable-next-line import/no-commonjs
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('SimpleScenarioTypes', 'icon', { type: Sequelize.STRING, defaultValue: null });
  },
  // eslint-disable-next-line no-unused-vars
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('SimpleScenarioTypes', 'icon');
  }
};