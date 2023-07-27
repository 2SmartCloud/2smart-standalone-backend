const { Op }              = require('sequelize');
const X                   = require('chista/Exception').default;
const ServiceBase         = require('../BaseService');
const { sequelize }       = require('../../../sequelize');
const reindexPosition = require('./Trait');

const Screens        = sequelize.model('Screens');
const Widgets        = sequelize.model('Widgets');
const GlobalSettings = sequelize.model('GlobalSettings');
const Topics         = sequelize.model('Topics');

class ScreensDelete extends ServiceBase {
    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (await GlobalSettings.get('secure_mode_enabled')) {
            if (!this.context || !this.context.pin) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
        }
    }

    async execute({ id }) {
        await this.middleCheckPermissions();
        await sequelize.transaction(async (transaction) => {
            const total = await Screens.count({ transaction });

            if (total <= 1) {
                throw new X({
                    code   : 'CAN_NOT_DELETE_LAST',
                    fields : {
                        id : 'CAN_NOT_DELETE_LAST'
                    }
                });
            }

            const widgets = await Widgets.findAll({ where: { screenId: id }, transaction });

            // Collect all widget IDs to delete its topics
            const widgetsIds = Array.from(widgets, widget => widget.id);

            await Topics.destroy({ where: { widgetId: { [Op.in]: widgetsIds } }, transaction });
            await Widgets.destroy({ where: { screenId: id }, transaction });
            await Screens.destroy({ where: { id }, transaction });

            await reindexPosition(Screens, transaction);
        });

        return {
            status : 1,
            data   : {}
        };
    }
}

ScreensDelete.validationRules = {
    id : [ 'required', 'primitive' ]
};

module.exports = ScreensDelete;
