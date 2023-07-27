'use strict';

/**
 * Found bug on CentOS mysql with MyISAM
 * Changing 20191210190950-mqtt_user_init.js migration to create table with InnoDB engine
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER TABLE `mqtt_user` ENGINE=InnoDB');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('ALTER TABLE `mqtt_user` ENGINE=InnoDB');
  }
};
