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
  title:'Schedule',
  description: 'This is a schedule scenario.\r\nChoose the topic(s), messages on start and end, that should be sent to this topic(s). Configure the time intervals for these messages by choosing schedule configuration and setting the time. This scenario is used to perform some actions at the beginning and at the end of the set time.',
  script:'schedule',
  configuration: {
    fields: [
      {
        label : 'Schedule*',
        name : 'SCHEDULE_CONFIG',
        type : 'schedule-config',
        validation: [ 'required', {
          'list_of_objects': {
            start:['required', 'string'],
            end:['required', 'string']
          }
        }, { 'list_min_length' : 1 }],
        default: [{ start: '', end: '' }]
      },
      {
        label:'Output topics*',
        name:'OUTPUT_TOPIC',
        type : 'topics',
        topicDataTypes : ['string', 'integer', 'float', 'boolean', 'enum', 'color'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Value for start time*',
        name:'START_TIME_VALUE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      },
      {
        label:'Value for end time*',
        name:'END_TIME_VALUE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      }
    ]
  },
  language: 'JS',
  icon: 'api/static/icons/scenarios/schedule-interval.svg'
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
