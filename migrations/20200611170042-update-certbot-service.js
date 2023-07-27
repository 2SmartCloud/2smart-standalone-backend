'use strict';

const CERTBOT_BRIDGE_TYPE_OLD = {
  title : 'Certbot service',
  type  : 'certbot-service',
};

const CERTBOT_BRIDGE_TYPE_NEW = {
  title : 'Certbot',
  type  : 'certbot-service',
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
    return updateScript(queryInterface, Sequelize, CERTBOT_BRIDGE_TYPE_NEW);
  },
  down: (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, CERTBOT_BRIDGE_TYPE_OLD);
  }
};
