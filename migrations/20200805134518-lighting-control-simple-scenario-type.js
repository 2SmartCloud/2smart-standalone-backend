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
  title:'Lighting Control',
  description:"This is lighting control scenario.\r\nChoose switch topic(s), then motion sensor topic and it's message to trigger the lighting. Shutdown time and lighting sensor topic are optional. Enter the shutdown time to set lighting duration after motion sensor was triggered. By choosing lighting sensor, you can set the target value at which lighting has to be active when the motion sensor is triggered.",
  script:'lighting-control',
  configuration: {
    fields: [
      {
        label:'Switch topics*',
        name:'SWITCH_TOPIC',
        type : 'topics',
        topicDataTypes : ['boolean'],
        validation: ['required', 'not_empty_list', {list_of:'string'}],
        placeholder: 'Select topics'
      },
      {
        label:'Motion sensor topic*',
        name:'MOTION_TOPIC',
        type : 'topic',
        topicDataTypes : ['string', 'integer', 'float', 'boolean', 'enum', 'color'],
        validation: ['required', 'string'],
        placeholder: 'Select topic'
      },
      {
        label: 'Trigger message*',
        name: 'TRIGGER_MESSAGE',
        type: 'string',
        validation: ['required', 'string'],
        placeholder: 'Set value'
      },
      {
        label:'Shutdown time (seconds)',
        name:'SHUTDOWN_TIME',
        type: 'number',
        validation: [
          'positive_decimal',
          { default: 10 },
        ],
        placeholder: 'Set value'
      },
      {
        label:'Lighting sensor topic',
        name:'LIGHTING_TOPIC',
        type : 'topic',
        topicDataTypes : ['string', 'integer', 'float'],
        validation: ['string'],
        placeholder: 'Select topic'
      },
    ]
  },
  language: 'JS',
  icon: 'api/static/icons/scenarios/lighting-control.svg'
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
