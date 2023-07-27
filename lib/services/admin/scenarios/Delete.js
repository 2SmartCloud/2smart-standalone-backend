const ServiceBase   = require('../BaseService');
const { sequelize } = require('../../../sequelize');

const Scenarios = sequelize.model('Scenarios');

class ScenarioDelete extends ServiceBase {
    async execute({ id }) {
        await this.middleCheckPermissions();
        await Scenarios.destroy({ where: { id } });

        return {
            status : 1,
            data   : {}
        };
    }
}
ScenarioDelete.validationRules = {
    id : [ 'required', 'primitive' ]
};

module.exports = ScenarioDelete;
