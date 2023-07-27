
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
    title:'Test title',
    description:'Desciption here',
    script:'test',
    configuration: {
        fields: [
            {
                label:'Test param 1',
                name:'TEST_PARAM_1',
                type : 'string',
                validation: [],
                default: 'Test param 1 value'
            },
            {
                label:'Test param 2 with validation(\'required\', \'string\')',
                name:'TEST_PARAM_2_WITH_VALIDATION',
                type : 'string',
                validation: ['required', 'string'],
                default: 'Test param 1 value'
            },
            {
                label:'Test param 3 with placeholder',
                name:'TEST_PARAM_3_WITH_PLACEHOLDER',
                type : 'string',
                validation: [],
                placeholder: 'on|off',
                default: 'on'
            },
            {
                label: 'Test json param 4',
                name :'TEST_JSON_PARAM_4',
                type : 'json',
                validation: [ 'required', 'any_object' ],
                default : {
                    message: "hi"
                }
            }
        ]
    },
    language:'JS'
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
