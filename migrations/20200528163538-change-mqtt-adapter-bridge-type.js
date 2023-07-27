'use strict';

const MQTT_ADAPTER_BRIDGE_TYPE_OLD = {
  type          : 'mqtt-adapter',
  configuration : {
    fields : [
      {
        label      : 'Config',
        name       : 'config.device',
        type       : 'javascript',
        default    :
            `module.exports = {
    extension: {
        transport: {
            // put your transport config here
        }
    },
    deviceConfig: {
        name: '',
        nodes: [
            {
                name: '',
                sensors: [
                    {
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another sensors here
                ],
                options: [
                    {
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another options here
                ],
                telemetry: [
                    {
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another telemetry here
                ]
            },
            // put another nodes here
        ],
    }
}`
      },
      {
        label   : 'Debug',
        name    : 'DEBUG',
        type    : 'string',
        default : null
      }
    ]
  },
  exposePort : true
};

const MQTT_ADAPTER_BRIDGE_TYPE_NEW = {
  type          : 'mqtt-adapter',
  configuration : {
    fields : [
      {
        label      : 'Config',
        name       : 'config.device',
        type       : 'javascript',
        default    :
            `module.exports = {
    extension: {
        transport: {
            // put your transport config here
        }
    },
    deviceConfig: {
        name: '',
        nodes: [
            {
                name: '',
                sensors: [
                    {
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another sensors here
                ],
                options: [
                    {
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another options here
                ],
                telemetry: [
                    {
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another telemetry here
                ]
            },
            // put another nodes here
        ],
    }
}`
      },
      {
        label   : 'Debug',
        name    : 'DEBUG',
        type    : 'string',
        default : null
      }
    ],
    exposePort : false,
    privilege  : true
  }
};

const updateScript = (queryInterface, Sequelize, MQTT_ADAPTER_BRIDGE_TYPE) => {
  const sequelize = queryInterface.sequelize;

  return sequelize.query(`SELECT * FROM bridgetypes WHERE type = "${MQTT_ADAPTER_BRIDGE_TYPE.type}"`, {
    type: sequelize.QueryTypes.SELECT
  }).then(arr => {
    if (arr.length) {
      return queryInterface.bulkUpdate(
          'bridgetypes',
          MQTT_ADAPTER_BRIDGE_TYPE,
          { id: arr[0].id },
          {},
          { configuration: { type: new Sequelize.JSON() } }
      );
    } else {
      return queryInterface.bulkInsert(
          'bridgetypes',
          [MQTT_ADAPTER_BRIDGE_TYPE],
          {},
          { configuration: { type: new Sequelize.JSON() }}
      );
    }
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, MQTT_ADAPTER_BRIDGE_TYPE_NEW);
  },
  down: (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, MQTT_ADAPTER_BRIDGE_TYPE_OLD);
  }
};
