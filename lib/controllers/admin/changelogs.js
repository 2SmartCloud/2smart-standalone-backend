const chista = require('../../chista');

const ChangelogsList = require('../../services/admin/changelogs/List');

module.exports = {
    list : chista.makeServiceRunner(ChangelogsList, req => req.query)
};
