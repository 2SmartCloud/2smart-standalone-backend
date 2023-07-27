'use strict';

module.exports = {
  up: (queryInterface) => {
    const { sequelize } = queryInterface;

    return sequelize.query(
        'SELECT sst.script, s.id, s.typeId FROM scenarios s JOIN simplescenariotypes sst ON s.typeId = sst.id',
        { type : sequelize.QueryTypes.SELECT }
    ).then(arr => Promise.all(
        arr.map(record => {
          if (record.typeId) {
            const simpleScenarioTypesToExtensionTypes = {
              thermostat          : '@2smart/thermostat',
              pidController       : '@2smart/analog-pid-controller',
              timeRelay           : '@2smart/time-relay',
              'sunrise-sunset'    : '@2smart/sunrise-sunset',
              mixedThermostat     : '@2smart/mixed-thermostat',
              'pwm-pidController' : '@2smart/digital-pid-controller',
              'schedule'          : '@2smart/watering-schedule',
              'alarmSystem'       : '@2smart/alarm-system',
              'lighting-control'  : '@2smart/lighting-control'
            };

            return queryInterface.bulkUpdate('scenarios', {
              type :  simpleScenarioTypesToExtensionTypes[record.script]
            }, { id: record.id }, {});
          }

          return Promise.resolve();
        })
    ));
  },

  down: (queryInterface) => {
    const { sequelize } = queryInterface;

    return sequelize.query(
        'UPDATE scenarios SET type = null WHERE typeId IS NOT NULL',
        { type : sequelize.QueryTypes.UPDATE }
    );
  }
};
