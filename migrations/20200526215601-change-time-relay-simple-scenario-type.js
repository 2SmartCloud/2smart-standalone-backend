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
  title:'Time Relay',
  description: 'This is a time relay scenario.\r\nChoose the topic(s) and message that should be sent to this topic(s). Configure the schedule sending for this message by choosing schedule type (fixed or periodic) and setting the time. When setting up a periodic schedule, consider that the specified time will be converted to a cron-based format.',
  script:'timeRelay',
  configuration: {
    fields: [
      {
        label:'Schedule*',
        name:'SCHEDULE',
        type : 'schedule',
        validation: ['required', 'string'],
        placeholder: 'Set schedule'
      },
      {
        label:'Switch topics*',
        name:'SWITCH_TOPIC',
        type : 'topics',
        topicDataTypes : ['string', 'integer', 'float', 'boolean', 'enum', 'color'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Message*',
        name:'MESSAGE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      }
    ]
  },
  language: 'JS',
  icon: 'api/static/icons/scenarios/schedule.svg'
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
