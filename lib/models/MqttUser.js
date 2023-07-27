const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class MqttUser extends Sequelize.Model {}

MqttUser.init({
    id           : { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true },
    username     : { type: Sequelize.STRING(1), defaultValue: null, unique: 'mqtt_username' },
    password     : { type: Sequelize.STRING(60), defaultValue: null },
    salt         : { type: Sequelize.STRING(100), defaultValue: null },
    is_superuser : { type: Sequelize.TINYINT, defaultValue: 0 },
    createdAt    : { type: Sequelize.DATE(3) },
    updatedAt    : { type: Sequelize.DATE(3) }
}, { sequelize });

module.exports = MqttUser;
