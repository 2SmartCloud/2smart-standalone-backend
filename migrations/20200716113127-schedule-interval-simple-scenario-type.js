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
  title:'Watering Schedule',
  description: 'This is a watering schedule scenario.\r\nChoose the topic(s), messages on start and end, that should be sent to this topic(s). Configure the time intervals for these messages by choosing schedule configuration and setting the time. This scenario is used to perform some actions at the beginning and at the end of the set time. Also, you can use this scenario for watering something, just choose wheather topic and wheather condition(s) at which watering is turned off. Condition values must be the same with values from wheather topic. Set time value for which watering is delayed.',
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
      },
      {
        label: 'Wheather topic',
        name: 'WHEATHER_TOPIC',
        type: 'topic',
        topicDataTypes: ['string'],
        validation: ['string'],
        placeholder: 'Select topic'
      },
      {
        label: 'Wheather condition',
        name: 'WHEATHER_CONDITION',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
      {
        label:'Time delay (minutes)',
        name:'TIME_DELAY',
        type: 'number',
        validation: [
          'decimal',
          { default: 0 },
          { min_number: 0 }
        ],
        placeholder: 'Set value'
      },
    ]
  },
  language: 'JS',
  icon: 'api/static/icons/scenarios/watering-schedule.svg'
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
