'use strict';

const SCENARIO_TEMPLATES_TABLE_NAME = 'ScenarioTemplates';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(SCENARIO_TEMPLATES_TABLE_NAME, {
            id           : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name         : { type: Sequelize.STRING,  unique: true,     allowNull: false },
            code         : { type: Sequelize.TEXT,    allowNull: false },
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

    down: (queryInterface) => {
        return queryInterface.dropTable(SCENARIO_TEMPLATES_TABLE_NAME);
    }
};
