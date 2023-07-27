'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Screens', {
            id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name      : { type: Sequelize.STRING, defaultValue: '' },
            position  : { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
            layout    : { type: Sequelize.JSON, defaultValue: {} },
            createdAt : { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            updatedAt : { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Screens');
    }
};
