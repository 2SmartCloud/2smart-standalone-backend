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
  title:'Mixed Thermostat',
  description:'This is a mixed thermostat scenario.\r\nSet topics for temperature, heating switch, cooling switch and values for hysteresis. Mixed thermostat provides automatic on/off heating and cooling switches. When temperature less than target, thermostat goes into heating mode, at temperature more than target - cooling mode. Mixed hysteresis and hysteresis fields are the sum, that sets step to switch mode. After saving you can change the target temperature by the corresponding widget.',
  script:'mixedThermostat',
  configuration: {
    fields: [
      {
        label:'Temperature topic*',
        name:'TEMP_TOPIC',
        type : 'topic',
        topicDataTypes : ['float', 'integer'],
        validation: ['required', 'string'],
        placeholder: 'Select topic'
      },
      {
        label:'Heating switch topics*',
        name:'HEATING_SWITCH_TOPIC',
        type : 'topics',
        topicDataTypes : ['boolean'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Cooling switch topics*',
        name:'COOLING_SWITCH_TOPIC',
        type : 'topics',
        topicDataTypes : ['boolean'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Mixed hysteresis*',
        name:'MIXED_HYSTERESIS',
        type: 'number',
        validation: ['required', 'positive_decimal'],
        placeholder: 'Set value'
      },
      {
        label:'Hysteresis',
        name:'HYSTERESIS',
        type: 'number',
        validation: [
          'decimal',
          { default: 0 },
          { min_number: 0 }
        ],
        placeholder: 'Set value'
      }
    ]
  },
  language: 'JS',
  icon: 'api/static/icons/scenarios/thermostat.svg'
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
