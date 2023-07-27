const X            = require('chista/Exception').default;
const ServiceBase  = require('../BaseService');
const { sequelize } = require('../../../sequelize');

const Screens        = sequelize.model('Screens');
const Widgets        = sequelize.model('Widgets');
const GlobalSettings = sequelize.model('GlobalSettings');
const Topics         = sequelize.model('Topics');

class WidgetsDelete extends ServiceBase {
    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (await GlobalSettings.get('secure_mode_enabled')) {
            if (!this.context || !this.context.pin) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
        }
    }

    async execute(data) {
        await this.middleCheckPermissions();
        await sequelize.transaction(async (transaction) => {
            const widget = await Widgets.findOne({
                where   : { id: data.id },
                include : [ {
                    model : Screens,
                    as    : 'screen'
                } ],
                transaction
            });

            if (!widget) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        widget : 'NOT_FOUND'
                    }
                });
            }

            if (!widget.screen) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        screen : 'NOT_FOUND'
                    }
                });
            }

            await Topics.destroy({ where: { widgetId: data.id }, transaction });
            await Widgets.destroy({ where: { id: data.id }, transaction });
        });

        return {
            status : 1,
            data   : {}
        };
    }
}

WidgetsDelete.validationRules = {
    id : [ 'required', 'primitive' ]
};

module.exports = WidgetsDelete;
