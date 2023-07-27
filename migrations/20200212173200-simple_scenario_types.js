'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.createTable('SimpleScenarioTypes', {
      id            : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title         : { type: Sequelize.STRING, allowNull: false },
      description   : { type: Sequelize.TEXT, allowNull: false },
      script        : { type: Sequelize.STRING, allowNull: false, unique: true },
      configuration : { type: Sequelize.JSON, defaultValue: null },
      createdAt     : { type: Sequelize.DATE(3) },
      updatedAt     : { type: Sequelize.DATE(3) }
    });
  },

  down : (queryInterface) => {
    return queryInterface.dropTable('SimpleScenarioTypes');
  }
};
