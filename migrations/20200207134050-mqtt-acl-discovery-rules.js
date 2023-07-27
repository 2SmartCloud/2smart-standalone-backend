'use strict';

const acl = [
  {
    allow    : 1,
    username : 'discovery',
    access   : 1,
    topic    : 'discovery/accepted/+'
  },
  {
    allow    : 1,
    username : 'discovery',
    access   : 2,
    topic    : 'discovery/new/+'
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mqtt_acl', acl);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mqtt_acl', acl);
  }
};
