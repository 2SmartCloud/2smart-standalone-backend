'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING, unique: false
    });
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.STRING, unique: true
    });
  }
};
