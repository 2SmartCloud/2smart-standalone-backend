
const updateScript = (queryInterface, Sequelize, script) => {
  const sequelize = queryInterface.sequelize;

  return sequelize.query(`SELECT * FROM SimpleScenarioTypes WHERE script = "${script.script}"`, { type: sequelize.QueryTypes.SELECT })
      .then(arr => {
        if (arr.length) {
          return queryInterface.bulkUpdate(
              'SimpleScenarioTypes',
              script,
              { id: arr[0].id },
              {},
              { configuration: { type: new Sequelize.JSON() } }
          );
        } else {
          return queryInterface.bulkInsert(
              'SimpleScenarioTypes',
              [script],
              {},
              { configuration: { type: new Sequelize.JSON() }}
          );
        }
      });
};

const script = {
  title:'Thermostat',
  description:'This is thermostat',
  script:'thermostat',
  configuration: {
    fields: [
      {
        label:'Temperature topic*',
        name:'TEMP_TOPIC',
        type : 'string',
        validation: ['required', 'string']
      },
      {
        label:'Switch topic*',
        name:'SWITCH_TOPIC',
        type : 'string',
        validation: ['required', 'string']
      },
      {
        label:'Hysteresis*',
        name:'HYSTERESIS',
        type : 'number',
        validation: ['required', 'positive_decimal']
      }
    ]
  },
  language: 'JS',
  icon: null
};
module.exports = {
  up : (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, script);
  },
  down : (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(`DELETE FROM SimpleScenarioTypes WHERE script = "${script.script}"`);
  }
};
