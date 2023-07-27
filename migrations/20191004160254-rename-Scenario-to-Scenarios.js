'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Scenario', 'Scenarios');
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.renameTable('Scenarios', 'Scenario');
  }
};
