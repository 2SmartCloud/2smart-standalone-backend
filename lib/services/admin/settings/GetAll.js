const ServiceBase    = require('../BaseService');
const { sequelize }    = require('../../../sequelize');

const GlobalSettings = sequelize.model('GlobalSettings');

class SettingsGetAll extends ServiceBase {
    async execute() {
        return {
            status : 1,
            data   : await GlobalSettings.getAll()
        };
    }
}

SettingsGetAll.validationRules = {};

module.exports = SettingsGetAll;
