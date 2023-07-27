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
  title:'Sunrise/Sunset',
  description: 'This is a sunrise-sunset scenario.\r\nChoose the city,  topic(s) and messages that should be set to this topic(s). You can choose topics for sunrise and sunset separately or both of them and adjust the scenario response time by time offset.',
  script:'sunrise-sunset',
  configuration: {
    fields: [
      {
        label:'City*',
        name:'CITY',
        type : 'enum-async',
        basePath: '/cities',
        validation: ['required', 'string'],
        placeholder: 'Search city'
      },
      {
        label:'Topic for sunrise',
        name:'SUNRISE_TOPIC',
        type : 'topics',
        topicDataTypes : ['string', 'integer', 'float', 'boolean', 'enum', 'color'],
        validation: [{list_of:'string'}, {required_if_empty_list: 'SUNSET_TOPIC' }],
        placeholder: 'Select topics'
      },
      {
        label:'Message',
        name:'SUNRISE_MESSAGE',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
      {
        label:'Time offset (minutes)',
        name:'SUNRISE_OFFSET',
        type: 'number',
        validation: [
          'decimal',
          { default: 0 }
        ],
        placeholder: 'Set value'
      },
      {
        label:'Topic for sunset',
        name:'SUNSET_TOPIC',
        type : 'topics',
        topicDataTypes : ['string', 'integer', 'float', 'boolean', 'enum', 'color'],
        validation: [{list_of:'string'}, {required_if_empty_list: 'SUNRISE_TOPIC' }],
        placeholder: 'Select topics'
      },
      {
        label:'Message',
        name:'SUNSET_MESSAGE',
        type: 'string',
        validation: ['string'],
        placeholder: 'Set value'
      },
      {
        label:'Time offset (minutes)',
        name:'SUNSET_OFFSET',
        type: 'number',
        validation: [
          'decimal',
          { default: 0 }
        ],
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
