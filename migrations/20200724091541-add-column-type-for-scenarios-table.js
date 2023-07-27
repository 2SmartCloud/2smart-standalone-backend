'use strict';

const TYPE_COLUMN = 'type'; // type column name

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Scenarios', TYPE_COLUMN, {
            type         : Sequelize.STRING,
            allowNull    : true
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Scenarios', TYPE_COLUMN);
    }
};
