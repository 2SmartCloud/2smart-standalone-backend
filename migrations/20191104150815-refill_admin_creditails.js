'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const { passwordMethods } = require('../lib/models/utils');
    const sequelize = queryInterface.sequelize ;
    return  sequelize.query('SELECT * FROM users WHERE id=1',{ type: sequelize.QueryTypes.SELECT }).then(function(users) {
      let user = users[0];
      user.name = 'admin';
      user.username = 'admin';
      user.passwordHash = passwordMethods.encrypt('2Smart');// set the very user friendly password
      return queryInterface.bulkUpdate('users', user,{ id:user.id }) ;
    })
  },

  down: (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize ;
    return  sequelize.query('SELECT * FROM users WHERE id=1',{ type: sequelize.QueryTypes.SELECT }).then(function(users) {
      let user = users[0];
      user.name = 'default';
      user.username = 'default';
      user.passwordHash = null;
      return queryInterface.bulkUpdate('users', user,{ id:user.id }) ;
    })
  }
};