'use strict';

const updateScript = (queryInterface, Sequelize, bridgeType) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(
        `SELECT * FROM bridgetypes WHERE type = "${bridgeType.type}"`,
        { type: sequelize.QueryTypes.SELECT }
    ).then(arr => {
        if (arr.length) {
            return queryInterface.bulkUpdate(
                'bridgetypes',
                bridgeType,
                { id: arr[0].id },
                {},
                { configuration: { type: new Sequelize.JSON() } }
            );
        } else {
            return queryInterface.bulkInsert(
                'bridgetypes',
                [bridgeType],
                {},
                { configuration: { type: new Sequelize.JSON() }}
            );
        }
    });
};

const bridgeType = {
    title         : 'Tesla Bridge',
    type          : 'tesla-bridge',
    registry      : 'registry.gitlab.webbylab.com/smarthome/tesla-bridge',
    configuration : {
        fields: [
            {
                label   : 'Device name',
                name    : 'DEVICE_NAME',
                type    : 'string',
                default : 'Tesla Bridge'
            },
            {
                label      : 'Client ID*',
                name       : 'CLIENT_ID',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384'
            },
            {
                label      : 'Client Secret*',
                name       : 'CLIENT_SECRET',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3'
            },
            {
                label      : 'Access token*',
                name       : 'OAUTH_ACCESS_TOKEN',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : ''
            },
            {
                label      : 'Refresh token*',
                name       : 'OAUTH_REFRESH_TOKEN',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : ''
            },
            {
                label   : 'Debug',
                name    : 'DEBUG',
                type    : 'string',
                default : null
            }
        ],
        exposePort : false,
        privilege  : false
    },
    icon: 'api/static/icons/tesla-bridge.svg'
};

module.exports = {
    up : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, bridgeType);
    },
    down : (queryInterface) => {
        return queryInterface.sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
    }
};
