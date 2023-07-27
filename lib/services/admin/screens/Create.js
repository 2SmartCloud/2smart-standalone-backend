const X                   = require('chista/Exception').default;
const ServiceBase    = require('../BaseService');
const { dumpScreen } = require('../utils.js');
const { sequelize }   = require('../../../sequelize');

const Screens = sequelize.model('Screens');
const GlobalSettings = sequelize.model('GlobalSettings');

class ScreensCreate extends ServiceBase {
    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (await GlobalSettings.get('secure_mode_enabled')) {
            if (!this.context || !this.context.pin) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
        }
    }
    async execute({ data: { position } }) {
        await this.middleCheckPermissions();
        const screen = await sequelize.transaction(async (transaction) => {
            // eslint-disable-next-line no-shadow
            const screen = await Screens.create({ position, parentControl: await GlobalSettings.get('secure_mode_enabled') }, { transaction, returning: true, individualHooks: true });

            await screen.update({ name: `My screen ${screen.id}` }, { transaction });

            return screen;
        });

        return {
            status : 1,
            data   : dumpScreen(screen)
        };
    }
}

ScreensCreate.validationRules = {
    data : [ 'required', { 'nested_object' : {
        position : [ 'required', 'positive_integer' ]
    } } ]
};

module.exports = ScreensCreate;
