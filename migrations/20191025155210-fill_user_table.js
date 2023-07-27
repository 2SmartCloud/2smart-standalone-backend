'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Promise = require('bluebird') ;
    const sequelize = queryInterface.sequelize ;
    let user = {
      id:1,
      name:'default',
      passwordHash:null,
      pinHash:null
    };
    return queryInterface.bulkInsert('users', [user]);
    //return queryInterface.bulkUpdate('users', user,{ id:user.id }) ;
  },

  down: (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize ;
    return  sequelize.query('TRUNCATE users') ;
  }
};
