const X                = require('chista/Exception').default;
const ServiceBase      = require('../BaseService');
const { sequelize }    = require('../../../sequelize');
const { dumpScenario } = require('../utils.js');

const Scenarios = sequelize.model('Scenarios');

class ScenarioShow extends ServiceBase {
    async execute({ id }) {
        await this.middleCheckPermissions();

        const scenario = await Scenarios.findOne({ where: { id } });

        if (!scenario) {
            throw new X({
                code   : 'WRONG_ID',
                fields : {
                    id : 'WRONG_ID'
                }
            });
        }

        return {
            status : 1,
            data   : dumpScenario(scenario)
        };
    }
}

ScenarioShow.validationRules = {
    id : [ 'required', 'primitive' ]
};

module.exports = ScenarioShow;
