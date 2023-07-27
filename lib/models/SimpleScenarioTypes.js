const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class SimpleScenarioTypes extends Sequelize.Model {}

SimpleScenarioTypes.init({
    id            : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title         : { type: Sequelize.STRING, allowNull: false },
    description   : { type: Sequelize.TEXT, allowNull: false },
    script        : { type: Sequelize.STRING, allowNull: false, unique: true },
    configuration : { type: Sequelize.JSON, defaultValue: null },
    language      : { type: Sequelize.ENUM('JS'), defaultValue: 'JS' },
    icon          : { type: Sequelize.STRING, defaultValue: '' },
    createdAt     : { type: Sequelize.DATE(3) },
    updatedAt     : { type: Sequelize.DATE(3) }
}, { sequelize });

SimpleScenarioTypes.initRelation = function initRelation() {
    const Scenarios = sequelize.model('Scenarios');

    this.hasMany(Scenarios, { foreignKey: 'typeId', as: 'scenarios' });
};

module.exports = SimpleScenarioTypes;
