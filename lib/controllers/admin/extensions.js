const chista = require('../../chista');

const ExtensionsList = require('../../services/admin/extensions/List');
const ExtensionsShow = require('../../services/admin/extensions/Show');

module.exports = {
    list : chista.makeServiceRunner(ExtensionsList, req => req.query),
    show : chista.makeServiceRunner(ExtensionsShow, req => ({ name: req.params.name }))
};
