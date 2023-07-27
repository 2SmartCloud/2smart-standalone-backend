'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query("DELETE FROM bridgetypes WHERE type = 'certbot-service'");
  },

  down: (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query("DELETE FROM bridgetypes WHERE type = 'certbot-service'");
  }
};
