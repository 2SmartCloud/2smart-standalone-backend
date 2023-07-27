'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      MQTT_ROOT_USERNAME
    } = process.env;
    const GUEST_USERNAME = 'guest';

    if (!MQTT_ROOT_USERNAME) throw new Error('MQTT_ROOT_USERNAME is required!');

    return queryInterface.sequelize.query(`INSERT IGNORE INTO \`mqtt_acl\` (\`id\`, \`allow\`, \`ipaddr\`, \`username\`, \`clientid\`, \`access\`, \`topic\`) VALUES (5,1,NULL,'${MQTT_ROOT_USERNAME}',NULL,3,'sweet-home/#'),(6,1,NULL,'${MQTT_ROOT_USERNAME}',NULL,3,'errors/#'),(7,1,NULL,'${MQTT_ROOT_USERNAME}',NULL,3,'scenarios/#'),(8,1,NULL,'${MQTT_ROOT_USERNAME}',NULL,3,'request/#'),(9,1,NULL,'${GUEST_USERNAME}',NULL,2,'request/new/#'),(10,0,NULL,'${GUEST_USERNAME}',NULL,1,'eq request/new/#'),(11,1,NULL,'${GUEST_USERNAME}',NULL,1,'request/token/#'),(12,0,NULL,'${GUEST_USERNAME}',NULL,1,'eq request/token/#');`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DELETE FROM `mqtt_acl` WHERE `id` IN (5,6,7,8,9,10,11,12)');
  }
};
