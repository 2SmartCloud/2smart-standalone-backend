'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BridgeTypes', 'privilege', { type: Sequelize.TINYINT, defaultValue: 0 });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BridgeTypes', 'privilege');
  }
};
