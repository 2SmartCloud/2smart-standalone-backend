'use strict';

const updateScript = (queryInterface, Sequelize, bridgeType) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(
        `SELECT * FROM bridgetypes WHERE type = "${bridgeType.type}"`,
        { type: sequelize.QueryTypes.SELECT }
    ).then(arr => {
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
  "title":"ESPHome Bridge",
  "type":"esphome-bridge",
  "registry":"registry.gitlab.webbylab.com/smarthome/esphome-bridge",
  "configuration":{
     "fields":[
        {
          "name":"DEVICE_NAME",
          "type":"string",
          "label":"Device name",
          "default":"ESPHome Bridge",
          "validation":[
             "string"
          ]
        },
        {
          "name":"HOME_ASSISTANT_MQTT_LOCAL_PORT_BINDING",
          "type":"exposed-port",
          "exposed_port_protocol":"tcp",
          "label":"Mqtt local Port*",
          "default":1884,
          "validation":[
             "required",
             "positive_integer"
          ]
        },
        {
          "name":"HOME_ASSISTANT_DISCOVERY_PREFIX",
          "type":"string",
          "label":"Discovery prefix*",
          "default":"homeassistant",
          "validation":[
             "required",
             "string"
          ]
        },
        {
          "name":"HOME_ASSISTANT_MQTT_USERNAME",
          "type":"string",
          "label":"Mqtt username",
          "default":"admin",
          "validation":[
             "string"
          ]
        },
        {
          "name":"HOME_ASSISTANT_MQTT_PASSWORD",
          "type":"string",
          "label":"Mqtt password",
          "default":"admin",
          "validation":[
             "string"
          ]
        },
        {
          "name":"DEBUG",
          "type":"string",
          "label":"Debug",
          "default":null
        }
     ]
  },
  icon: 'api/static/icons/esphome-bridge.svg'
};

module.exports = {
    up : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, bridgeType);
    },
    down : (queryInterface) => {
        return queryInterface.sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
    }
};
