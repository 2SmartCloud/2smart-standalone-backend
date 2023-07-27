const bridgeType = {
    title         : 'Auto Discovery',
    type          : 'auto-discovery-service',
    registry      : 'registry.gitlab.webbylab.com/smarthome/auto-discovery-service',
    configuration : {
        fields : [
            {
                label   : 'Service name',
                name    : 'DEVICE_NAME',
                type    : 'string',
                default : 'Auto Discovery'
            }
        ],
        network_mode : 'host'
    },
    icon : 'api/static/icons/auto-discovery.svg'
};

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'bridgetypes',
            [ bridgeType ],
            {},
            { configuration: { type: new Sequelize.JSON() } }
        );
    },
    down : (queryInterface) => {
        return queryInterface.sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
    }
};
