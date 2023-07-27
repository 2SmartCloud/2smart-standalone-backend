'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Topics', {
            id           : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            topic        : { type: Sequelize.STRING, defaultValue: null },
            topicName    : { type: Sequelize.STRING, defaultValue: null },
            dataType     : { type: Sequelize.STRING, defaultValue: null },
            deviceId     : { type: Sequelize.STRING, allowNull: false },
            nodeId       : { type: Sequelize.STRING, defaultValue: null },
            propertyId   : { type: Sequelize.STRING, defaultValue: null },
            hardwareType : { type: Sequelize.STRING, defaultValue: null },
            propertyType : { type: Sequelize.STRING, defaultValue: null },
            order        : { type: Sequelize.INTEGER, allowNull: false },
            widgetId     : { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Widgets', key: 'id' } },
            createdAt    : {
                type         : Sequelize.DATE(3),
                defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3)')
            },
            updatedAt    : {
                type         : Sequelize.DATE(3),
                defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
            }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Topics');
    }
};
