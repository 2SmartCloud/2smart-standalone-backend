'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Scenarios', 'createdAt', {
      type         : Sequelize.DATE(3),
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3)')
    }).then(() => {
      return queryInterface.changeColumn('Scenarios', 'updatedAt', {
        type         : Sequelize.DATE(3),
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      },{
        logging:console.log
      });
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Scenarios', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }).then(() => {
      return queryInterface.changeColumn('Scenarios', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      });
    });
  }
};
