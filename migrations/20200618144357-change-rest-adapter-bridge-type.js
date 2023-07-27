'use strict';

const updateScript = (queryInterface, Sequelize, bridgeType) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(`SELECT * FROM bridgetypes WHERE type = "${bridgeType.type}"`, { type: sequelize.QueryTypes.SELECT })
        .then(arr => {
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

const REST_ADAPTER_BRIDGE_TYPE_OLD = {
    type          : 'rest-adapter',
    configuration : {
        fields: [
            {
                label   :'Service name',
                name    :'DEVICE_NAME',
                type    : 'string',
                default : 'REST adapter'
            },
            {
                label:'Basic auth login',
                name:'BASIC_AUTH_LOGIN',
                type : 'string',
                validation: [ 'string' ],
                default: ''
            },
            {
                label:'Basic auth password',
                name:'BASIC_AUTH_PASSWORD',
                type : 'string',
                validation: [ 'string' ],
                default: ''
            },
            {
                label : 'Debug',
                name : 'DEBUG',
                type : 'string',
                default : null
            }
        ],
        exposePort : true,
        privilege  : true
    }
};

const REST_ADAPTER_BRIDGE_TYPE_NEW = {
    type          : 'rest-adapter',
    configuration : {
        fields: [
            {
                label   :'Service name',
                name    :'DEVICE_NAME',
                type    : 'string',
                default : 'REST adapter'
            },
            {
                label:'Basic auth login',
                name:'BASIC_AUTH_LOGIN',
                type : 'string',
                validation: [ 'string' ],
                default: ''
            },
            {
                label:'Basic auth password',
                name:'BASIC_AUTH_PASSWORD',
                type : 'string',
                validation: [ 'string' ],
                default: ''
            },
            {
                label      : 'Allowed topics',
                name       : 'ALLOWED_TOPICS',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : '#'
            },
            {
                label : 'Debug',
                name : 'DEBUG',
                type : 'string',
                default : null
            }
        ],
        exposePort : true,
        privilege  : true
    }
};

module.exports = {
    up : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, REST_ADAPTER_BRIDGE_TYPE_NEW);
    },
    down : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, REST_ADAPTER_BRIDGE_TYPE_OLD);
    }
};
