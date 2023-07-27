'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Scenario', ['name'], {
      type: 'unique',
      name: 'scenarios_unique_name_constr'
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Scenario', 'scenarios_unique_name_constr');
  }
};
