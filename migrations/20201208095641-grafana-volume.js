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
  "title":"Grafana",
  "type":"grafana-service",
  "registry":"registry.gitlab.webbylab.com/smarthome/grafana-service",
  "configuration":{
     "fields":[
        {
           "name":"DEVICE_NAME",
           "type":"string",
           "label":"Service name",
           "default":"Grafana"
        }
     ],
     "volumes": {"{BRIDGE}/lib": "/var/lib/grafana"},
     "exposePort":true
  },
  "icon":"api/static/icons/grafana.svg"
};

module.exports = {
    up : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, bridgeType);
    },
    down : (queryInterface) => {
        return queryInterface.sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
    }
};
