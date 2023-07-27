'use strict';
const crypto = require('crypto');

function generatePass(pass) {
  return crypto.createHash('sha256').update(pass).digest('hex');
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DISCOVERY_PASS  = generatePass('discovery');

    return queryInterface.sequelize.query(`INSERT IGNORE INTO \`mqtt_user\` (\`username\`, \`password\`) VALUES ('discovery','${DISCOVERY_PASS}');`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DELETE FROM `mqtt_user` WHERE `username`="discovery";');
  }
};
