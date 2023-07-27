const ServiceBase    = require('../BaseService');
const { dumpBridgeType } = require('../utils.js');
const { sequelize }    = require('../../../sequelize');

const BridgeTypes = sequelize.model('BridgeTypes');

/* eslint-disable camelcase */
class BridgeTypesList extends ServiceBase {
    async execute() {
        await this.middleCheckPermissions();
        const  bridgeTypes = await BridgeTypes.findAll({
            where : {}
        });

        const res = bridgeTypes.map(dumpBridgeType);

        return {
            status : 1,
            data   : res
        };
    }
}

module.exports = BridgeTypesList;
