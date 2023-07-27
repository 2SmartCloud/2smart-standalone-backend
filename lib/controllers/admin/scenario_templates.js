const chista = require('../../chista');

const ScenarioTemplatesList = require('../../services/admin/scenario_templates/List');

module.exports = {
    list : chista.makeServiceRunner(ScenarioTemplatesList)
};
