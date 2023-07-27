const Base                = require('../Base');
const { dumpScreen }      = require('../dumps');
const { sequelize }       = require('../../../sequelize');
const ValidationException = require('../../../utils/errors/ValidationException');
const ForbiddenException  = require('../../../utils/errors/ForbiddenException');
const {
    forbidden  : { PERMISSION_DENIED },
    validation : { NOT_FOUND }
} = require('../../../utils/errors/codes');

const Screens        = sequelize.model('Screens');
const Widgets        = sequelize.model('Widgets');
const Topics         = sequelize.model('Topics');
const GlobalSettings = sequelize.model('GlobalSettings');

class ScreensShow extends Base {
    async checkUserPermissions(screen) {
        const isSecureModeEnabled = await GlobalSettings.get('secure_mode_enabled');

        if (isSecureModeEnabled && screen.parentControl && !this.context.pin) {
            throw new ForbiddenException(PERMISSION_DENIED);
        }
    }

    async execute({ id }) {
        const screen = await Screens.findOne({
            where   : { id },
            include : [
                {
                    model   : Widgets,
                    as      : 'widgets',
                    include : [
                        {
                            model : Topics,
                            as    : 'topics'
                        }
                    ]
                }
            ]
        });

        if (!screen) {
            throw new ValidationException(NOT_FOUND, { entityName: 'Screen' });
        }

        await this.checkUserPermissions(screen);

        return {
            status : 1,
            data   : await dumpScreen(screen)
        };
    }
}

ScreensShow.validationRules = {
    id : [ 'required', 'string' ]
};

module.exports = ScreensShow;
