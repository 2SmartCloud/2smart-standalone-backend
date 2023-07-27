

module.exports = {
  up : (queryInterface, Sequelize) => {
    const Promise = require('bluebird');
    const sequelize = queryInterface.sequelize;

    const bridge_types_new = [
      {
        title :'KNX Bridge',
        type  :'knx',
        configuration : {
          fields: [
            {
              label:'Connection IP',
              name:'KNX_CONNECTION_IP_ADDR',
              type : 'string',
              validation: [],
              placeholder: 'ip address'
            },
            {
              label:'Connection port',
              name:'KNX_CONNECTION_IP_PORT',
              type : 'number',
              validation: [],
              placeholder: 'port',
              default: 502
            },
            {
              label:'Physical address of the ip interface',
              name:'KNX_CONNECTION_PHYS_ADDR',
              type : 'string',
              validation: [],
              placeholder: '1.1.1'
            },
            {
              label:'Local Port',
              name:'KNX_CONNECTION_LOCAL_PORT_BINDING',
              type : 'number',
              validation: [],
              placeholder: '3672'
            },
            {
              label:'Local IP',
              name:'KNX_CONNECTION_LOCAL_IP',
              type : 'string',
              validation: [],
              placeholder: 'ip address'
            },
            {
              label:'DEBUG',
              name:'DEBUG',
              type : 'string',
              validation: [],
              placeholder: 'debug',
              default: ''
            },
            {
              label:'Device id',
              name:'DEVICE_ID',
              type : 'string',
              validation: [],
              placeholder: 'Device id'
            },
            {
              label:'Device name',
              name:'DEVICE_NAME',
              type : 'string',
              validation: [],
              default: 'KNX Bridge'
            },
            {
              label : 'Debug',
              name : 'DEBUG',
              type : 'string',
              default : null
            },
            {
              label : 'Nodes Configaration',
              name : 'config.nodes',
              type : 'json',
              default : {
                "extensions": {
                  "mapping": {}
                },
                "nodes": []
              }
            }
          ]
        },
        icon: null
      },
      {
        title :'Modbus Bridge',
        type  :'modbus',
        configuration : {
          fields: [
            {
              label:'Connection IP',
              name:'MODBUS_CONNECTION_IP',
              type : 'string',
              validation: [],
              placeholder: 'ip address'
            },
            {
              label:'Connection port',
              name:'MODBUS_CONNECTION_PORT',
              type : 'number',
              validation: [],
              placeholder: 'port',
              default: 502
            },
            {
              label:'Device id',
              name:'DEVICE_ID',
              type : 'string',
              validation: [],
              placeholder: 'Device id'
            },
            {
              label:'Device name',
              name:'DEVICE_NAME',
              type : 'string',
              validation: [],
              default: 'Modbus Bridge'
            },
            {
              label:'Poll interval',
              name:'POLL_INTERVAL',
              type : 'number',
              validation: [],
              default: 5000
            },
            {
              label : 'Debug',
              name : 'DEBUG',
              type : 'string',
              default : null
            },
            {
              label : 'Nodes Configaration',
              name : 'config.nodes',
              type : 'json',
              default : {
                "nodes": []
              }
            }
          ]
        },
        icon: null
      },
      {
        title :'Pohodnya Stantsia Bridge',
        type  :'yahoo_weather',
        configuration : {

        },
        icon: 'api/static/icons/yahoo-weather.svg'
      },
      {
        title :'Xiaomi',
        type  :'xiaomi_weather',
        configuration : {

        },
        icon: null
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
