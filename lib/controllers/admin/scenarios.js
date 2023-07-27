const chista = require('../../chista');

const ScenariosList          = require('../../services/admin/scenarios/List');
const ScenariosCreate        = require('../../services/admin/scenarios/Create');
const ScenariosShow          = require('../../services/admin/scenarios/Show');
const ScenariosDelete        = require('../../services/admin/scenarios/Delete');
const ScenariosUpdate        = require('../../services/admin/scenarios/Update');
const ScenariosGetUniqueName = require('../../services/admin/scenarios/GetUniqueName');

module.exports = {
    list          : chista.makeServiceRunner(ScenariosList, req => req.query),
    create        : chista.makeServiceRunner(ScenariosCreate, req => req.body),
    show          : chista.makeServiceRunner(ScenariosShow, req => ({ id: req.params.id })),
    delete        : chista.makeServiceRunner(ScenariosDelete, req => ({ id: req.params.id })),
    update        : chista.makeServiceRunner(ScenariosUpdate, req => ({ ...req.body, id: req.params.id })),
    getUniqueName : chista.makeServiceRunner(
        ScenariosGetUniqueName,
        req => ({ type: req.query.type, mode: req.query.mode })
    )
};
