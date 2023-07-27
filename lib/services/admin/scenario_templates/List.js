const ServiceBase              = require('../BaseService');
const { sequelize }            = require('../../../sequelize');
const { dumpScenarioTemplate } = require('../utils');

const ScenarioTemplates = sequelize.model('ScenarioTemplates');

class ScenarioTemplatesList extends ServiceBase {
    async execute() {
        await this.middleCheckPermissions();

        const scenarioTemplates = await ScenarioTemplates.findAll({ where: {} });

        return {
            status : 1,
            data   : scenarioTemplates.map(dumpScenarioTemplate)
        };
    }
}

module.exports = ScenarioTemplatesList;
