'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Widgets', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }).then(() => {
      return queryInterface.changeColumn('Widgets', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      });
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Widgets', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.NOW
    }).then(() => {
      return queryInterface.changeColumn('Widgets', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.NOW
      });
    });
  }
};
