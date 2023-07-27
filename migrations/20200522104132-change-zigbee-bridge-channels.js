
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

const old = {
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
        label:'Zigbee channel',
        name:'ZIGBEE_CHANNEL',
        type : 'string',
        validation: ['required', 'string', { 'one_of': [ '11', '15', '20', '25' ] }],
        default: '11'
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
  icon: 'api/static/icons/zigbee.svg'
};

module.exports = {
  up : (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, {
      ...old,
      configuration: {
        ...old.configuration,
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
            label:'Zigbee channel',
            name:'ZIGBEE_CHANNEL',
            type: 'enum',
            format: [
              { label: '11', value: 11 },
              { label: '12', value: 12 },
              { label: '13', value: 13 },
              { label: '14', value: 14 },
              { label: '15', value: 15 },
              { label: '16', value: 16 },
              { label: '17', value: 17 },
              { label: '18', value: 18 },
              { label: '19', value: 19 },
              { label: '20', value: 20 },
              { label: '21', value: 21 },
              { label: '22', value: 22 },
              { label: '23', value: 23 },
              { label: '24', value: 24 },
              { label: '25', value: 25 },
            ],
            validation: ['required', 'integer', { 'number_between': [ 11, 25 ] }],
            default: 11
          },
          {
            label : 'Debug',
            name : 'DEBUG',
            type : 'string',
            default : null
          }
        ]
      }
    });
  },
  down : (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, old);
  }
};
