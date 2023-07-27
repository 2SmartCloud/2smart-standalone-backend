'use strict';
const crypto = require('crypto');

function generatePass(pass) {
  return crypto.createHash('sha256').update(pass).digest('hex');
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      MQTT_ROOT_USERNAME,
      MQTT_ROOT_PASSWORD
    } = process.env;
    const GUEST_USERNAME = 'guest';

    if (!MQTT_ROOT_USERNAME) throw new Error('MQTT_ROOT_USERNAME is required!');

    const ROOT_PASS_HASH  = generatePass(MQTT_ROOT_PASSWORD);
    const GUEST_PASS_HASH = generatePass('');

    return queryInterface.sequelize.query(`INSERT IGNORE INTO \`mqtt_user\` (\`id\`, \`username\`, \`password\`, \`created\`) VALUES (1,'${MQTT_ROOT_USERNAME}','${ROOT_PASS_HASH}',NOW()), (2,'${GUEST_USERNAME}','${GUEST_PASS_HASH}',NOW());`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DELETE FROM `mqtt_user` WHERE `id` IN (1,2);');
  }
};
