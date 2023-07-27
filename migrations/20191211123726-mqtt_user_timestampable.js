'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('mqtt_user', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }).then(() => {
      return queryInterface.addColumn('mqtt_user', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      });
    }).then(() => {
      return queryInterface.removeColumn('mqtt_user', 'created');
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mqtt_user', 'createdAt')
    .then(() => {
      return queryInterface.removeColumn('mqtt_user', 'updatedAt');
    })
    .then(() => {
      return queryInterface.addColumn('mqtt_user', 'created', {
        type         : Sequelize.DATE,
        defaultValue : null
      });
    });
  }
};
