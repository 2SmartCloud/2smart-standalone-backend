const chista = require('../../chista');

const SimpleScenarioTypesList = require('../../services/admin/simple_scenario_types/List');

module.exports = {
    list : chista.makeServiceRunner(SimpleScenarioTypesList, req => req.query)
};
