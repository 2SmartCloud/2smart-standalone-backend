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
                      { configuration: { type: new Sequelize.JSON() } }
                  );
              }
          });
    };
    
    const script = {
      title: 'PID Controller',
      description: 'This is PID Controller scenario.\r\nSet input, output topics, and entry parameters for the PID controller. After saving you can change the target value by an appropriate widget.',
      script: 'pidController',
      configuration: {
          fields: [
              {
                  label: 'Input topic*',
                  name: 'INPUT_TOPIC',
                  type: 'topic',
                  topicDataTypes: ['float','integer', 'string'],
                  validation: ['required', 'string'],
                  placeholder: 'Select topic'
              },
              {
                  label: 'Output topics*',
                  name: 'OUTPUT_TOPIC',
                  type: 'topics',
                  topicDataTypes: ['float', 'integer', 'string'],
                  validation: ['required', 'not_empty_list', {list_of: 'string'}],
                  placeholder: 'Select topics'
              },
              {
                  label: 'Proportional gain*',
                  name: 'PROPORTIONAL_GAIN',
                  type: 'number',
                  validation: ['required', 'positive_decimal'],
                  placeholder: 'Set value',
                  defaultValue: 30
              },
              {
                  label: 'Integral gain*',
                  name: 'INTEGRAL_GAIN',
                  type: 'number',
                  validation: ['required', { min_number: 0 }],
                  placeholder: 'Set value',
                  defaultValue: 0
              },
              {
                  label: 'Derivative gain*',
                  name: 'DERIVATIVE_GAIN',
                  type: 'number',
                  validation: ['required', { min_number: 0 }],
                  placeholder: 'Set value',
                  defaultValue: 20
              },
              {
                  label: 'Sample time (ms)*',
                  name: 'SAMPLE_TIME',
                  type: 'number',
                  validation: ['required', { min_number: 1000 }],
                  placeholder: 'Set value',
                  defaultValue: 1000
              },
              {
                  label: 'Min range*',
                  name: 'MIN_RANGE',
                  type: 'number',
                  validation: ['required', { min_number: 0 }],
                  placeholder: 'Set value'
              },
              {
                  label: 'Max range*',
                  name: 'MAX_RANGE',
                  type: 'number',
                  validation: ['required', 'positive_decimal'],
                  placeholder: 'Set value'
              },
          ]
      },
      language: 'JS',
      icon: 'api/static/icons/scenarios/pidController.svg'
    };
    
    module.exports = {
      up: (queryInterface, Sequelize) => {
          return updateScript(queryInterface, Sequelize, script);
      },
      down: (queryInterface, Sequelize) => {
          const sequelize = queryInterface.sequelize;
    
          return sequelize.query(`DELETE FROM SimpleScenarioTypes WHERE script = "${script.script}"`)
      }
    };
