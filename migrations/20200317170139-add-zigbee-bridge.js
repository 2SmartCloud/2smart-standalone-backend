
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
  title         : 'Zigbee Bridge',
  type          : 'zigbee-bridge',
  registry      : 'registry.gitlab.webbylab.com/smarthome/zigbee-bridge',
  configuration : {
    fields: [
      {
        label:'Device name',
        name:'DEVICE_NAME',
        type : 'string',
        validation: [],
        default: 'Zigbee Bridge'
      },
      {
        label:'Connection IP*',
        name:'ZIGBEE_CONNECTION_IP',
        type : 'string',
        validation: ['required', 'string'],
      },
      {
        label:'Connection port*',
        name:'ZIGBEE_CONNECTION_PORT',
        type : 'integer',
        validation: ['required', 'positive_integer'],
        default: 1775
      },
      {
        label : 'Debug',
        name : 'DEBUG',
        type : 'string',
        default : null
      }
    ],
    volumes: {
      '{BRIDGE}/herdsman' : '{BRIDGE}/herdsman'
    },
  },
  icon: null
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
