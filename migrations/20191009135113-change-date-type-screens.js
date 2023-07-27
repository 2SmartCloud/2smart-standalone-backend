'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Screens', 'createdAt', {
      type         : Sequelize.DATE(3),
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3)')
    }).then(() => {
      return queryInterface.changeColumn('Screens', 'updatedAt', {
        type         : Sequelize.DATE(3),
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      },{
        logging:console.log
      });
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Screens', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.NOW
    }).then(() => {
      return queryInterface.changeColumn('Screens', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.NOW
      });
    });
  }
};
