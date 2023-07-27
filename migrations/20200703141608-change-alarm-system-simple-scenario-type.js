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
  title:'Alarm System',
  description:'This is an alarm system scenario.',
  script:'alarmSystem',
  configuration: {
    fields: [
      {
        label:'Topics for activate*',
        name:'ACTIVATE_TOPIC',
        type : 'topics',
        topicDataTypes : ['float', 'integer', 'boolean', 'enum', 'string', 'color'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Message for activate topics*',
        name:'ACTIVATE_MESSAGE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      },
      {
        label:'Message for deactivate topics*',
        name:'DEACTIVATE_MESSAGE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      },
      {
        label:'Triggers*',
        name:'TRIGGER',
        type : 'topics',
        topicDataTypes : ['float', 'integer', 'boolean', 'enum', 'color'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Message for triggers*',
        name:'TRIGGER_MESSAGE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      },
      {
        label : 'Action topics*',
        name : 'ACTION_TOPIC',
        type : 'action-topics-config',
        topicDataTypes : ['float', 'integer', 'boolean', 'enum', 'color'],
        validation: [ 'required', {
          'list_of_objects': {
            topic:['required', 'string'],
            messageOn:['required', 'string'],
            messageOff:['required', 'string']

          }
        }, { 'list_min_length' : 1 }],
        default: [{ topic: '', message: '', messageOff:'' }]
      },
      {
        label:'Notification channels',
        name:'NOTIFICATION_CHANNELS',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
      {
        label:'Notification message',
        name:'NOTIFICATION_MESSAGE',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
    ]
  },
  language: 'JS',
  icon: 'api/static/icons/scenarios/alarm.svg'
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
