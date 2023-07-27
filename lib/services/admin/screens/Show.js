const X                   = require('chista/Exception').default;
const ServiceBase         = require('../BaseService');
const { sequelize }        = require('../../../sequelize');
const { dumpScreen } = require('../utils.js');

const Screens = sequelize.model('Screens');
const Widgets = sequelize.model('Widgets');
const GlobalSettings = sequelize.model('GlobalSettings');
const Topics = sequelize.model('Topics');

class ScreensShow extends ServiceBase {
    static validationRules = {
        id : [ 'required', 'primitive' ]
    };
    async middleCheckPermissions(screen) {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (screen.parentControl && await GlobalSettings.get('secure_mode_enabled')) {
            if (!this.context || !this.context.pin) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
        }
    }

    async execute({ id }) {
        const screen = await Screens.findOne({
            where   : { id },
            include : [ {
                model   : Widgets,
                as      : 'widgets',
                include : [ {
                    model : Topics,
                    as    : 'topics'
                } ],
                order : [
                    [ Topics, 'order', 'ASC' ]
                ]
            } ]
        });

        if (!screen) {
            throw new X({
                code   : 'WRONG_ID',
                fields : {
                    id : 'WRONG_ID'
                }
            });
        }
        await this.middleCheckPermissions(screen);

        return {
            status : 1,
            data   : dumpScreen(screen)
        };
    }
}

module.exports = ScreensShow;
