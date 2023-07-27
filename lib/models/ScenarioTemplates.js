const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class ScenarioTemplates extends Sequelize.Model {}

ScenarioTemplates.init({
    id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name      : { type: Sequelize.STRING,  unique: true,     allowNull: false },
    code      : { type: Sequelize.TEXT,    allowNull: false },
    createdAt : { type: Sequelize.DATE(3) },
    updatedAt : { type: Sequelize.DATE(3) }
}, { sequelize });

ScenarioTemplates.initRelation = function initRelation() {};

module.exports = ScenarioTemplates;
