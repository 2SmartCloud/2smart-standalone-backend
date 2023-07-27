'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Scenario', {
      id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name      : { type: Sequelize.STRING, allowNull: false },
      title     : { type: Sequelize.STRING, allowNull: false },
      mode      : { type: Sequelize.ENUM('ADVANCED', 'SIMPLE'), defaultValue: 'ADVANCED' },
      status    : { type: Sequelize.ENUM('ACTIVE', 'INACTIVE'), defaultValue: 'INACTIVE' },
      script    : { type: Sequelize.TEXT, defaultValue: '' },
      language  : { type: Sequelize.ENUM('JS'), defaultValue: 'JS' },
      createdAt : { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt : { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Scenario');
  }
};
