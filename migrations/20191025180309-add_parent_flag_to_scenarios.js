// eslint-disable-next-line import/no-commonjs
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Scenarios', 'parentControl', { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false });
  },
  // eslint-disable-next-line no-unused-vars
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Scenarios', 'parentControl');
  }
};