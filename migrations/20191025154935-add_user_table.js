'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id      : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name    : { type: Sequelize.STRING, unique: true },
      pinHash : { type: Sequelize.STRING(255) },
      passwordHash : { type: Sequelize.STRING(255) },
      createdAt : { type: Sequelize.DATE(3), defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3)') },
      updatedAt : { type: Sequelize.DATE(3), defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)') }
    })
  },

  down : (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};
