'use strict';

const {
  MQTT_ROOT_USERNAME
} = process.env;
const events_acl = {
  allow    : 1,
  username : MQTT_ROOT_USERNAME,
  access   : 3,
  topic    : '#'
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (!MQTT_ROOT_USERNAME) throw new Error('MQTT_ROOT_USERNAME is required!');

    return queryInterface.bulkInsert('mqtt_acl', [ events_acl ]);
  },

  down: (queryInterface, Sequelize) => {
    if (!MQTT_ROOT_USERNAME) throw new Error('MQTT_ROOT_USERNAME is required!');

    return queryInterface.bulkDelete('mqtt_acl', {
      where: events_acl
    });
  }
};
