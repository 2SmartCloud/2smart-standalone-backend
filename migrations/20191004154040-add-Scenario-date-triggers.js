'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Scenario', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }).then(() => {
      return queryInterface.changeColumn('Scenario', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },{
        logging:console.log
      });
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Scenario', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.NOW
    }).then(() => {
      return queryInterface.changeColumn('Scenario', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.NOW
      });
    });
  }
};
