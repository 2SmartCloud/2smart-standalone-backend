const _    = require('underscore');
const Promise    = require('bluebird');
const { Op } = require('sequelize');
const ServiceBase    = require('../BaseService');
const { sequelize }   = require('../../../sequelize');
const updateUtils  = require('./updateUtils');

const GlobalSettings = sequelize.model('GlobalSettings');

class SettingsUpdate extends ServiceBase {
    async execute({ data }) {
        await this.middleCheckPermissions();

        await sequelize.transaction(async (transaction) => {
            // eslint-disable-next-line more/force-native-methods
            return Promise.each(_.keys(data), async (key) => {
                await updateUtils.validateGlobalOptionsNewValue(key, data[key], { transaction });

                return GlobalSettings.set(key, data[key], { transaction });
            });
        });

        return {
            status : 1,
            data   : await GlobalSettings.getAll({
                // eslint-disable-next-line more/force-native-methods
                where : { name: { [Op.in]: _.keys(data) } }
            })
        };
    }
}

SettingsUpdate.validationRules = {
    data : [ 'required', { 'object_with_rules_for_values': [ 'primitive' ] } ]
};

module.exports = SettingsUpdate;
