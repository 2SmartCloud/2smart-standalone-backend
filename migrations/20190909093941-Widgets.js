'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Widgets', {
            id           : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name         : { type: Sequelize.STRING, defaultValue: '', trim: true },
            type         : { type: Sequelize.ENUM('string', 'number', 'enum', 'chart', 'input', 'toggle'), allowNull: false },
            deviceId     : { type: Sequelize.STRING, allowNull: false },
            nodeId       : { type: Sequelize.STRING, defaultValue: null },
            propertyId   : { type: Sequelize.STRING, defaultValue: null },
            hardwareType : { type: Sequelize.STRING, defaultValue: null },
            propertyType : { type: Sequelize.STRING, defaultValue: null },
            topic        : { type: Sequelize.STRING, defaultValue: null },
            bgColor      : { type: Sequelize.STRING, defaultValue: '#ffffff' },
            advanced     : { type: Sequelize.JSON, defaultValue: {} },
            screenId     : { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Screens', key: 'id' } },
            createdAt    : { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            updatedAt    : { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Widgets');
    }
};
