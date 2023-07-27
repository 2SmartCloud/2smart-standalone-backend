const chista = require('../../chista');

const CitiesList = require('../../services/admin/cities/List');

module.exports = {
    list : chista.makeServiceRunner(CitiesList, req => req.query)
};
