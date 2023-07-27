'use strict';

const MQTT_ADAPTER_BRIDGE_TYPE = {
  title         : 'MQTT adapter',
  type          : 'mqtt-adapter',
  registry      : 'registry.gitlab.webbylab.com/smarthome/mqtt-adapter',
  configuration : {
    fields : [
      {
        label   :'Device name',
        name    :'DEVICE_NAME',
        type    : 'string',
        default : 'MQTT adapter'
      },
      {
        label   : 'Config',
        name    : 'config.device',
        type    : 'javascript',
        default :
`
module.exports = {
    extension: {
        transport: {
            // put your transport config here
        }
    },
    deviceConfig: {
        nodes: [
            {
                id: '',
                name: '',
                sensors: [
                    {
                        id: '',
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another sensors here
                ],
                options: [
                    {
                        id: '',
                        name: '',
                        datatype: '',
                        settable: '',
                        retained: ''
                    },
                    // put another options here
                ],
                telemetry: [
                    {
                        id: '',
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
  },
  icon : 'api/static/icons/mqtt-adapter.svg'
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
  up : (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, MQTT_ADAPTER_BRIDGE_TYPE);
  },
  down : (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;
    return sequelize.query(`DELETE FROM bridgetypes WHERE type = "${MQTT_ADAPTER_BRIDGE_TYPE.type}"`);
  }
};
