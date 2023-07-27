'use strict';

module.exports = {
  up  : function (queryInterface, Sequelize) {
    return queryInterface
      .changeColumn('Widgets', 'type', {
        type: Sequelize.ENUM('string', 'number', 'enum', 'chart', 'input', 'toggle', 'gauge'),
        allowNull: false
      });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface
      .changeColumn('Widgets', 'type', {
        type: Sequelize.ENUM('string', 'number', 'enum', 'chart', 'input', 'toggle'),
        allowNull: false
      });
  }
};
