const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class Topics extends Sequelize.Model {}

Topics.init({
    id           : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    topic        : { type: Sequelize.STRING, defaultValue: null },
    topicName    : { type: Sequelize.STRING, defaultValue: null },
    dataType     : { type: Sequelize.STRING, defaultValue: null },
    deviceId     : { type: Sequelize.STRING, allowNull: false },
    nodeId       : { type: Sequelize.STRING, defaultValue: null },
    propertyId   : { type: Sequelize.STRING, defaultValue: null },
    hardwareType : { type: Sequelize.STRING, defaultValue: null },
    propertyType : { type: Sequelize.STRING, defaultValue: null },
    order        : { type: Sequelize.INTEGER, allowNull: false },
    widgetId     : { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Widgets', key: 'id' } },
    createdAt    : { type: Sequelize.DATE(3) },
    updatedAt    : { type: Sequelize.DATE(3) }
}, {
    sequelize,
    indexes : [ {
        unique : true,
        fields : [ 'topic', 'widgetId' ]
    } ]
});

Topics.initRelation = function initRelation() {
    const Widgets = sequelize.model('Widgets');

    this.belongsTo(Widgets, { foreignKey: 'widgetId', as: 'widget' });
};

module.exports = Topics;
