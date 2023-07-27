const chista = require('../../chista');

const ScreensList = require('../../services/admin/screens/List');
const ScreensCreate = require('../../services/admin/screens/Create');
const ScreensShow = require('../../services/admin/screens/Show');
const ScreensDelete = require('../../services/admin/screens/Delete');
const ScreensUpdate = require('../../services/admin/screens/Update');

module.exports = {
    list   : chista.makeServiceRunner(ScreensList, req => req.query),
    create : chista.makeServiceRunner(ScreensCreate, req => req.body),
    show   : chista.makeServiceRunner(ScreensShow, req => ({ id: req.params.id })),
    delete : chista.makeServiceRunner(ScreensDelete, req => ({ id: req.params.id })),
    update : chista.makeServiceRunner(ScreensUpdate, req => ({ ...req.body, id: req.params.id }))
};
