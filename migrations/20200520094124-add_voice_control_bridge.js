
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

const bridgeType = {
  title         : 'Voice Control Bridge',
  type          : 'voice-control-bridge',
  registry      : 'registry.gitlab.webbylab.com/smarthome/voice-control-bridge',
  configuration : {
    fields: [
        {
          label:'Device name',
          name:'DEVICE_NAME',
          type : 'string',
          validation: [],
          default: 'Voice Control Bridge'
        },
        {
          label : 'Nodes Configaration',
          name : 'config',
          type : 'json',
          default : {
            "config": {
              "bridge": {
                "name": "Homebridge2smart",
                "username": "0E:87:6B:6C:6E:16",
                "port": 51862,
                "pin": "888-88-888"
              },
              "accessories": [
                  
              ],
              "platforms": [
                {
                  "name": "Config",
                  "port": 6060,
                  "platform": "config"
                }
              ]
            }
          }
        }
    ],
    volumes: {"./system/ssl": '/app', '{BRIDGE}/persist' : '/homebridge/persist'},
    network_mode: 'host',
    privilege: true,
    exposePort: false
  },
  icon: 'api/static/icons/homebridge.svg'
};
module.exports = {
  up : (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, bridgeType);
  },
  down : (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
  }
};
