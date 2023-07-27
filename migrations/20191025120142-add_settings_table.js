'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.createTable('GlobalSettings', {
      name  : { type: Sequelize.STRING, primaryKey: true },
      value : { type: Sequelize.TEXT },
      type  : { type: Sequelize.ENUM('string', 'number', 'boolean', 'json','date'), allowNull: false },
      createdAt : { type: Sequelize.DATE(3), defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3)') },
      updatedAt : { type: Sequelize.DATE(3), defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)') }
    })
  },

  down : (queryInterface) => {
    return queryInterface.dropTable('GlobalSettings');
  }
};
