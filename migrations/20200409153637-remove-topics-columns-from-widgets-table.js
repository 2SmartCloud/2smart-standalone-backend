'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Widgets', 'topic'),
            queryInterface.removeColumn('Widgets', 'topicName'),
            queryInterface.removeColumn('Widgets', 'dataType'),
            queryInterface.removeColumn('Widgets', 'deviceId'),
            queryInterface.removeColumn('Widgets', 'nodeId'),
            queryInterface.removeColumn('Widgets', 'propertyId'),
            queryInterface.removeColumn('Widgets', 'hardwareType'),
            queryInterface.removeColumn('Widgets', 'propertyType')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Widgets', 'topic', { type: Sequelize.STRING, defaultValue: null }),
            queryInterface.addColumn('Widgets', 'topicName', { type: Sequelize.STRING, defaultValue: null }),
            queryInterface.addColumn('Widgets', 'dataType', { type: Sequelize.STRING, defaultValue: null }),
            queryInterface.addColumn('Widgets', 'deviceId', { type: Sequelize.STRING, allowNull: false }),
            queryInterface.addColumn('Widgets', 'nodeId', { type: Sequelize.STRING, defaultValue: null }),
            queryInterface.addColumn('Widgets', 'propertyId', { type: Sequelize.STRING, defaultValue: null }),
            queryInterface.addColumn('Widgets', 'hardwareType', { type: Sequelize.STRING, defaultValue: null }),
            queryInterface.addColumn('Widgets', 'propertyType', { type: Sequelize.STRING, defaultValue: null })
        ]);
    }
};
