'use strict';

const SIMPLE_REST_ADAPTER_BRIDGE_TYPE_OLD = {
    type          : 'simple-rest-adapter',
    configuration : {
        fields: [
            {
                label   : 'Service name',
                name    : 'DEVICE_NAME',
                type    : 'string',
                default : 'Simple REST adapter'
            },
            {
                label      : 'Basic auth login',
                name       : 'BASIC_AUTH_LOGIN',
                type       : 'string',
                validation : [ 'string' ],
                default    : ''
            },
            {
                label      : 'Basic auth password',
                name       : 'BASIC_AUTH_PASSWORD',
                type       : 'string',
                validation : [ 'string' ],
                default    : ''
            },
            {
                label      : 'Allowed topics',
                name       : 'ALLOWED_TOPICS',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : '#'
            },
            {
                label   : 'Debug',
                name    : 'DEBUG',
                type    : 'string',
                default : null
            }
        ],
        exposePort : true,
        privilege  : true
    },
    icon: 'api/static/icons/simple-rest-adapter.svg'
};

const SIMPLE_REST_ADAPTER_BRIDGE_TYPE_NEW = {
    type          : 'simple-rest-adapter',
    configuration : {
        fields: [
            {
                label   : 'Service name',
                name    : 'DEVICE_NAME',
                type    : 'string',
                default : 'Simple REST adapter'
            },
            {
                label      : 'Basic auth login',
                name       : 'BASIC_AUTH_LOGIN',
                type       : 'string',
                validation : [ 'string', { 'required_if_not_empty': 'BASIC_AUTH_PASSWORD' } ],
                default    : ''
            },
            {
                label      : 'Basic auth password',
                name       : 'BASIC_AUTH_PASSWORD',
                type       : 'string',
                validation : [ 'string', { 'required_if_not_empty': 'BASIC_AUTH_LOGIN' } ],
                default    : ''
            },
            {
                label      : 'Allowed topics',
                name       : 'ALLOWED_TOPICS',
                type       : 'string',
                validation : [ 'required', 'string' ],
                default    : '#'
            },
            {
                label   : 'Debug',
                name    : 'DEBUG',
                type    : 'string',
                default : null
            }
        ],
        exposePort : true,
        privilege  : true
    },
    icon: 'api/static/icons/simple-rest-adapter.svg'
};

const updateScript = (queryInterface, Sequelize, simpleRestAdapterBridgeType) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(`SELECT * FROM bridgetypes WHERE type = "${simpleRestAdapterBridgeType.type}"`, {
        type: sequelize.QueryTypes.SELECT
    }).then(arr => {
        if (arr.length) {
            return queryInterface.bulkUpdate(
                'bridgetypes',
                simpleRestAdapterBridgeType,
                { id: arr[0].id },
                {},
                { configuration: { type: new Sequelize.JSON() } }
            );
        } else {
            return queryInterface.bulkInsert(
                'bridgetypes',
                [simpleRestAdapterBridgeType],
                {},
                { configuration: { type: new Sequelize.JSON() }}
            );
        }
    });
};

module.exports = {
    up: (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, SIMPLE_REST_ADAPTER_BRIDGE_TYPE_NEW);
    },
    down: (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, SIMPLE_REST_ADAPTER_BRIDGE_TYPE_OLD);
    }
};
