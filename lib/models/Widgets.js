const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class Widgets extends Sequelize.Model {}

Widgets.init({
    id        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name      : { type: Sequelize.STRING, defaultValue: '', trim: true },
    type      : { type: Sequelize.STRING, trim: true, allowNull: false },
    bgColor   : { type: Sequelize.STRING, defaultValue: '#ffffff' },
    advanced  : { type: Sequelize.JSON, defaultValue: {} },
    screenId  : { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Screens', key: 'id' } },
    createdAt : { type: Sequelize.DATE(3) },
    updatedAt : { type: Sequelize.DATE(3) }
}, { sequelize });

Widgets.initRelation = function initRelation() {
    const Screens = sequelize.model('Screens');
    const Topics = sequelize.model('Topics');

    this.belongsTo(Screens, { foreignKey: 'screenId', as: 'screen' });
    this.hasMany(Topics, { foreignKey: 'widgetId', as: 'topics' });
};

module.exports = Widgets;
