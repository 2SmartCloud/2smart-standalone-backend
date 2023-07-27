

module.exports = {
  up : (queryInterface, Sequelize) => {
    const Promise = require('bluebird');
    const sequelize = queryInterface.sequelize;

    const modbus_hardwares = [
      'MB2DI2RO',
      'MB4RTD',
      'MB8ROModule.ModbusRTU.Relay.12',
      'meter.LE-01M',
      'ModbusRTU.Relay.RS485RB',
      'ModbusRTU.Relay.with.DIP.RS485RB',
      'thermometer.SHT20',
      'thermometer.sm100',
      'thermometer.t10s-b',
      'thermometer.XY-MD02',
      'WP3082ADAM',
      'WP3084ADAM',
      'WP8025ADAM',
      'WP8027ADAM',
      'YDTH-06'
    ];
    const bridge_types_new = [
      {
        title         : 'KNX Bridge',
        type          : 'knx-bridge',
        registry      : 'registry.gitlab.webbylab.com/smarthome/knx-bridge',
        configuration : {
          fields: [
            {
              label:'Device name',
              name:'DEVICE_NAME',
              type : 'string',
              validation: [],
              default: 'KNX Bridge'
            },
            {
              label:'Connection IP*',
              name:'KNX_CONNECTION_IP_ADDR',
              type : 'string',
              validation: [ 'required', 'string' ]
            },
            {
              label:'Connection port*',
              name:'KNX_CONNECTION_IP_PORT',
              type : 'integer',
              validation: [ 'required', 'positive_integer' ],
              default: 3671
            },
            {
              label:'Physical address of the ip interface*',
              name:'KNX_CONNECTION_PHYS_ADDR',
              type : 'string',
              validation: [ 'required', 'string' ],
              placeholder: '1.1.1'
            },
            {
              label:'Local Port*',
              name:'KNX_CONNECTION_LOCAL_PORT_BINDING',
              type : 'integer',
              validation: [ 'required', 'positive_integer' ],
              default: 3672
            },
            {
              label:'Local IP*',
              name:'KNX_CONNECTION_LOCAL_IP',
              type : 'string',
              validation: [ 'required', 'string' ]
            },
            {
              label : 'Debug',
              name : 'DEBUG',
              type : 'string',
              default : null
            },
            {
              label : 'Nodes Configuration*',
              name : 'nodes.config',
              type : 'json',
              validation: [ 'required', 'any_object' ],
              default : {
                "extensions": {
                  "mapping": {}
                },
                "nodes": []
              }
            }
          ]
        },
        icon: 'api/static/icons/knx.svg'
      },
      {
        title         : 'Modbus Bridge',
        type          : 'modbus-bridge',
        registry      : 'registry.gitlab.webbylab.com/smarthome/modbus-bridge',
        configuration : {
          fields: [
            {
              label:'Device name',
              name:'DEVICE_NAME',
              type : 'string',
              validation: [],
              default: 'Modbus Bridge'
            },
            {
              label:'Connection IP*',
              name:'MODBUS_CONNECTION_IP',
              type : 'string',
              validation: ['required', 'string'],
            },
            {
              label:'Connection port*',
              name:'MODBUS_CONNECTION_PORT',
              type : 'integer',
              validation: ['required', 'positive_integer'],
              default: 502
            },
            {
              label:'Poll interval*',
              name:'POLL_INTERVAL',
              type : 'integer',
              validation: ['required', 'positive_integer'],
              default: 5000
            },
            {
              label : 'Debug',
              name : 'DEBUG',
              type : 'string',
              default : null
            },
            {
              label : 'Nodes Configuration*',
              name : 'nodes.config',
              type : 'modbus-config',
              validation: [ 'required', {
                'nested_object': {
                  nodes:[ 'required', {
                    'list_of_objects': {
                      id:['required', 'positive_integer', {min_number:1}, {max_number:255}],
                      hardware:['required', {'one_of':modbus_hardwares}]
                    }
                  }, { 'list_unique_by' : 'id' }, { 'list_min_length' : 1 }]
                }
              } ],
              default : {
                "nodes": []
              },
              hardwares: modbus_hardwares
            }
          ]
        },
        icon: 'api/static/icons/modbus.svg'
      },
      {
        title         : 'Yahoo Weather',
        type          : 'device-virtual-weather',
        registry      : 'registry.gitlab.webbylab.com/smarthome/device-virtual-weather',
        configuration : {
          fields: [
            {
              label:'Device name',
              name:'DEVICE_NAME',
              type : 'string',
              validation: [],
              default: 'Yahoo Weather'
            },
            {
              label:'App ID*',
              name:'YAHOO_APP_ID',
              type : 'string',
              validation: ['required', 'string']
            },
            {
              label:'Consumer Key*',
              name:'YAHOO_APP_CONSUMER_KEY',
              type : 'string',
              validation: ['required', 'string']
            },
            {
              label:'Consumer Secret*',
              name:'YAHOO_APP_CONSUMER_SECRET',
              type : 'string',
              validation: ['required', 'string']
            }
          ]
        },
        icon: 'api/static/icons/yahoo-weather.svg'
      },
      {
        title         : 'Xiaomi Gateway Bridge',
        type          : 'xiaomi-gateway-bridge',
        registry      : 'registry.gitlab.webbylab.com/smarthome/xiaomi-gateway-bridge',
        configuration : {
          fields: [
            {
              label:'Device name',
              name:'DEVICE_NAME',
              type : 'string',
              validation: [],
              default: 'Xiaomi Gateway Bridge'
            },
            {
              label:'Xiaomi Gateway IP*',
              name:'DEVICE_IP',
              type : 'string',
              validation: ['required', 'string']
            },
            {
              label:'API Key*',
              name:'API_KEY',
              type : 'string',
              validation: ['required', 'string']
            },
            {
              label:'Enable TLS',
              name:'SECURE',
              type : 'string',
              validation: [],
              placeholder: 'on|off',
              default: 'on'
            }
          ],
          volumes: {
            './system/ssl/certs/ca.pem' : '/app/lib/etc/ca.pem'
          },
          network_mode: 'host'
        },
        icon: 'api/static/icons/xiaomi.svg'
      }
    ];


    return sequelize.query('TRUNCATE bridgetypes').then(() => {
      return queryInterface.bulkInsert('bridgetypes', bridge_types_new.map((bridge_type, ind) => {
        return {
          id : ind+1,
          ...bridge_type
        }
      }), {},{ configuration: { type: new Sequelize.JSON() } });
    }).catch((err) => {
      console.log(err) ;
      throw err;
    })
  },

  down : (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;


    return  sequelize.query('TRUNCATE bridgetypes');
  }
};
