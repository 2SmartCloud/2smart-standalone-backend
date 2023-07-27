const ServiceBase    = require('../BaseService');
const { dumpScenarioType } = require('../utils.js');
const { sequelize }    = require('../../../sequelize');

const SimpleScenarioTypes = sequelize.model('SimpleScenarioTypes');

/* eslint-disable camelcase */
class SimpleScenarioTypesList extends ServiceBase {
    async execute() {
        await this.middleCheckPermissions();
        const  scenarioTypes = await SimpleScenarioTypes.findAll({
            where : {}
        });

        const res = scenarioTypes.map(dumpScenarioType);

        return {
            status : 1,
            data   : res
        };
    }
}

module.exports = SimpleScenarioTypesList;
