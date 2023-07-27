
const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');
const { injectMethods, passwordMethods } = require('./utils');

class Users extends Sequelize.Model {}

injectMethods(Users, passwordMethods);
Users.init({
    id       : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name     : { type: Sequelize.STRING, unique: false },
    username : { type: Sequelize.STRING, unique: true },
    pinHash  : { type: Sequelize.STRING(255) },
    pin      : { type : Sequelize.VIRTUAL,
        set(pin) {
            this.setDataValue('pinHash', this.encrypt(pin));
        } },
    passwordHash : { type: Sequelize.STRING(255) },
    password     : { type : Sequelize.VIRTUAL,
        set(password) {
            this.setDataValue('passwordHash', this.encrypt(password));
        } },
    createdAt : { type: Sequelize.DATE(3) },
    updatedAt : { type: Sequelize.DATE(3) }
}, { sequelize });

Users.initRelation = function initRelation() {
};

module.exports = Users;
