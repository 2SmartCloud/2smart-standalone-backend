const bridgeType = {
  title         : 'Grafana',
  type          : 'grafana-service',
  registry      : 'registry.gitlab.webbylab.com/smarthome/grafana-service',
  configuration : {
    fields : [
      {
        label   : 'Service name',
        name    : 'DEVICE_NAME',
        type    : 'string',
        default : 'Grafana'
      }
    ],
    exposePort : true
  },
  icon : 'api/static/icons/grafana.svg'
};

module.exports = {
  up : (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'bridgetypes',
      [ bridgeType ],
      {},
      { configuration: { type: new Sequelize.JSON() } }
    );
  },
  down : (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
  }
};
