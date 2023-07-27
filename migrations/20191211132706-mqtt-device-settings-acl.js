'use strict';

const {
  MQTT_ROOT_USERNAME
} = process.env;
const device_settings_acl = {
  allow    : 1,
  username : MQTT_ROOT_USERNAME,
  access   : 3,
  topic    : 'device-settings/#'
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (!MQTT_ROOT_USERNAME) throw new Error('MQTT_ROOT_USERNAME is required!');

    return queryInterface.bulkInsert('mqtt_acl', [ device_settings_acl ]);
  },

  down: (queryInterface, Sequelize) => {
    if (!MQTT_ROOT_USERNAME) throw new Error('MQTT_ROOT_USERNAME is required!');

    return queryInterface.bulkDelete('mqtt_acl', [ device_settings_acl ]);
  }
};
