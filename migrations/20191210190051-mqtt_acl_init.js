'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("CREATE TABLE IF NOT EXISTS `mqtt_acl` (`id` int(11) unsigned NOT NULL AUTO_INCREMENT, `allow` int(1) DEFAULT NULL COMMENT '0: deny, 1: allow', `ipaddr` varchar(60) DEFAULT NULL COMMENT 'IpAddress', `username` varchar(100) DEFAULT NULL COMMENT 'Username', `clientid` varchar(100) DEFAULT NULL COMMENT 'ClientId', `access` int(2) NOT NULL COMMENT '1: subscribe, 2: publish, 3: pubsub', `topic` varchar(100) NOT NULL DEFAULT '' COMMENT 'Topic Filter', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DROP TABLE `mqtt_acl`;');
  }
};
