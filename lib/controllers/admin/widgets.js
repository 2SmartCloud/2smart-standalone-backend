const chista = require('../../chista');

const WidgetsCreate = require('../../services/admin/widgets/Create');
const WidgetsDelete = require('../../services/admin/widgets/Delete');
const WidgetsUpdate = require('../../services/admin/widgets/Update');

module.exports = {
    create : chista.makeServiceRunner(WidgetsCreate, req => req.body),
    delete : chista.makeServiceRunner(WidgetsDelete, req => ({ id: req.params.id, screen: req.body.data })),
    update : chista.makeServiceRunner(WidgetsUpdate, req => ({ ...req.body, id: req.params.id }))
};
