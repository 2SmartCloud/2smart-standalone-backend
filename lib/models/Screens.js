const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class Screens extends Sequelize.Model {
    static sortLayoutByCoordinates(layoutByScreenSize) {
        return layoutByScreenSize.sort((firstWidgetInfo, secondWidgetInfo) => {
            if (
                (firstWidgetInfo.y < secondWidgetInfo.y) ||
                ((firstWidgetInfo.y === secondWidgetInfo.y) && (firstWidgetInfo.x < secondWidgetInfo.x))
            ) return -1;

            if (
                (firstWidgetInfo.y > secondWidgetInfo.y) ||
                ((firstWidgetInfo.y === secondWidgetInfo.y) && (firstWidgetInfo.x > secondWidgetInfo.x))
            ) return 1;

            return 0;
        });
    }
}

Screens.init({
    id            : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name          : { type: Sequelize.STRING, defaultValue: '' },
    position      : { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    layout        : { type: Sequelize.JSON, defaultValue: {} },
    parentControl : { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
    createdAt     : { type: Sequelize.DATE(3) },
    updatedAt     : { type: Sequelize.DATE(3) }
}, { sequelize });

Screens.initRelation = function initRelation() {
    const Widgets = sequelize.model('Widgets');

    this.hasMany(Widgets, { foreignKey: 'screenId', as: 'widgets' });
};

module.exports = Screens;
