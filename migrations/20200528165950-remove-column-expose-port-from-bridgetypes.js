'use strict';

const EXPOSE_PORT_COLUMN = 'exposePort'; // expose port column name

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BridgeTypes', EXPOSE_PORT_COLUMN);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BridgeTypes', EXPOSE_PORT_COLUMN, {
      type         : Sequelize.BOOLEAN,
      defaultValue : false,
      allowNull    : false
    });
  }
};
