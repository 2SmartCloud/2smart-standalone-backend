const chista = require('../../chista');

const SettingsGetAll = require('../../services/admin/settings/GetAll');
const SettingsUpdate = require('../../services/admin/settings/Update');

module.exports = {
    getAll : chista.makeServiceRunner(SettingsGetAll, req => req.query),
    update : chista.makeServiceRunner(SettingsUpdate, req => req.body)
};
