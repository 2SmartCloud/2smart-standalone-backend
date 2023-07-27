'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BridgeTypes', {
      id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title     : { type: Sequelize.STRING, allowNull: false },
      type      : { type: Sequelize.STRING, allowNull: false, unique: true },
      configuration : { type: Sequelize.JSON, defaultValue: null },
      registry  : { type: Sequelize.STRING, defaultValue: null },
      icon      : { type: Sequelize.STRING, defaultValue: null },
      createdAt : {
        type: Sequelize.DATE(3),
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      updatedAt : {
        type: Sequelize.DATE(3),
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BridgeTypes');
  }
};
