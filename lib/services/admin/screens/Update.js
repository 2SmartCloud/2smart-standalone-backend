const X              = require('chista/Exception').default;
const ServiceBase    = require('../BaseService');
const { dumpScreen } = require('../utils.js');
const { sequelize }  = require('../../../sequelize');

const Screens = sequelize.model('Screens');
const GlobalSettings = sequelize.model('GlobalSettings');

class ScreensUpdate extends ServiceBase {
    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (await GlobalSettings.get('secure_mode_enabled')) {
            if (!this.context || !this.context.pin) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
        }
    }

    async execute({ id, data }) {
        await this.middleCheckPermissions();
        const screen = await sequelize.transaction(async (transaction) => {
            // eslint-disable-next-line no-shadow
            const screen = await Screens.findOne({ where: { id }, transaction });

            if (!screen) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        screen : 'NOT_FOUND'
                    }
                });
            }

            await screen.update(data, { transaction });

            return screen;
        });

        return {
            status : 1,
            data   : dumpScreen(screen)
        };
    }
}

ScreensUpdate.validationRules = {
    id   : [ 'required', 'primitive' ],
    data : [ 'required', { 'nested_object' : {
        name          : [ 'true_string', 'not_empty', { 'min_length': 1 }, { 'max_length': 25 } ],
        layout        : [ 'not_empty' ],
        parentControl : [ 'boolean' ]
    } } ]
};

module.exports = ScreensUpdate;
