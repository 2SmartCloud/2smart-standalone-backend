const chista = require('../../chista');

const BridgeTypesList = require('../../services/admin/bridge_types/List');

module.exports = {
    list : chista.makeServiceRunner(BridgeTypesList, req => req.query)
};
