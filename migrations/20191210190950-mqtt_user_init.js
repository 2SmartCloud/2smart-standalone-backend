'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE TABLE IF NOT EXISTS `mqtt_user` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `username` varchar(100) DEFAULT NULL, `password` varchar(100) DEFAULT NULL, `salt` varchar(35) DEFAULT NULL, `is_superuser` tinyint(1) DEFAULT 0, `created` datetime DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `mqtt_username` (`username`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DROP TABLE `mqtt_user`;');
  }
};
