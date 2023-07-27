
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
  description:'This is thermostat scenario.\r\nSet topics for temperature, switch and value for hysteresis. After saving you can change the target temperature by the corresponding widget.',
  script:'thermostat',
  configuration: {
    fields: [
      {
        label:'Temperature topic*',
        name:'TEMP_TOPIC',
        type : 'topic',
        topicDataTypes : ['float'],
        validation: ['required', 'string'],
        placeholder: 'Select topic'
      },
      {
        label:'Switch topic*',
        name:'SWITCH_TOPIC',
        type : 'topics',
        topicDataTypes : ['boolean'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Hysteresis*',
        name:'HYSTERESIS',
        type : 'number',
        validation: ['required', 'positive_decimal'],
        placeholder: 'Set a positive decimal value'
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
