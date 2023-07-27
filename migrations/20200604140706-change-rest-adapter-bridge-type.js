
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
  title         : 'REST Adapter',
  type          : 'rest-adapter',
  registry      : 'registry.gitlab.webbylab.com/smarthome/rest-adapter',
  configuration : {
    fields: [
      {
        label   :'Service name',
        name    :'DEVICE_NAME',
        type    : 'string',
        default : 'MQTT adapter'
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
  },
  icon: 'api/static/icons/rest-adapter.svg'
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
