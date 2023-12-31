'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING, unique: true
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'username');
  }
};
