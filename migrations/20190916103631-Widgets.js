'use strict';

module.exports = {
  up  : function (queryInterface, Sequelize) {
    return queryInterface
      .changeColumn('Widgets', 'type', {
        type: Sequelize.ENUM('string', 'number', 'enum', 'chart', 'input', 'toggle', 'gauge', 'slider', 'thermostat'),
        allowNull: false
      });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface
      .changeColumn('Widgets', 'type', {
        type: Sequelize.ENUM('string', 'number', 'enum', 'chart', 'input', 'toggle', 'gauge', 'slider'),
        allowNull: false
      });
  }
};
