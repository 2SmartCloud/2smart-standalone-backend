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
  description:'This is an alarm system scenario.\r\nChoose topic(s) and enter messages to activate / deactivate an alarm. Select the sensor topics and enter the message at which the alarm should be turned on. In the action topics configuration, select topics and messages, that will be published, depending on the status of the alarm. You can also add push notifications in case of the alarm in your slack / telegram channels.',
  script:'alarmSystem',
  configuration: {
    fields: [
      {
        label:'Topics for activate alarm',
        name:'ACTIVATE_TOPIC',
        type : 'topics',
        topicDataTypes : ['float', 'integer', 'boolean', 'enum', 'string', 'color'],
        validation: [{list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Topic message to activate alarm',
        name:'ACTIVATE_MESSAGE',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
      {
        label:'Topic message to deactivate alarm',
        name:'DEACTIVATE_MESSAGE',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
      {
        label:'Sensor Topics*',
        name:'SENSOR_TOPIC',
        type : 'topics',
        topicDataTypes : ['float', 'integer', 'boolean', 'enum', 'color'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Message from sensor topics*',
        name:'SENSOR_MESSAGE',
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
        default: [{ topic: '', messageOn: '', messageOff:'' }]
      },
      {
        label : 'Notification channels',
        name : 'NOTIFICATION_CHANNELS',
        type : 'notification-config',
        validation: [ { 'list_of_objects': [{
          channel: ['string'],
          message: ['string']
      }]}],
        default: [{ channel: '', message: '' }]
      }
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
