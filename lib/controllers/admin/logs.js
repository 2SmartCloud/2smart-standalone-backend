const chista = require('../../chista');

const LogsList = require('../../services/admin/logs/List');

module.exports = {
    list : chista.makeServiceRunner(LogsList, req => req.query)
};
