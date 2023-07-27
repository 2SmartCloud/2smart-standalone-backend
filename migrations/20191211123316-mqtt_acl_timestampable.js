'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('mqtt_acl', 'createdAt', {
      type         : Sequelize.DATE,
      defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
    }).then(() => {
      return queryInterface.addColumn('mqtt_acl', 'updatedAt', {
        type         : Sequelize.DATE,
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      });
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mqtt_acl', 'createdAt')
    .then(() => {
      return queryInterface.removeColumn('mqtt_acl', 'updatedAt');
    });
  }
};
