
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
const modbus_hardwares = [
  'MB2DI2RO',
  'MB4RTD',
  'MB8ROModule.ModbusRTU.Relay.12',
  'meter.LE-01M',
  'ModbusRTU.Relay.RS485RB.1',
  'ModbusRTU.Relay.RS485RB.2',
  'ModbusRTU.Relay.RS485RB.4',
  'ModbusRTU.Relay.RS485RB.8',
  'ModbusRTU.Relay.with.DIP.RS485RB.1',
  'ModbusRTU.Relay.with.DIP.RS485RB.2',
  'ModbusRTU.Relay.with.DIP.RS485RB.4',
  'ModbusRTU.Relay.with.DIP.RS485RB.8',
  'thermometer.SHT20',
  'thermometer.sm100',
  'thermometer.t10s-b',
  'thermometer.XY-MD02',
  'WP3082ADAM',
  'WP3084ADAM',
  'WP8025ADAM',
  'WP8027ADAM',
  'YDTH-06',
  'SDM630MCT',
  'Heat_calculator_TVK-01',
  'PD3060'
];
const bridgeType = {
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
          "nodes": [{ id: '', hardware: '' }]
        },
        hardwares: modbus_hardwares
      }
    ]
  },
  icon: 'api/static/icons/modbus.svg'
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
