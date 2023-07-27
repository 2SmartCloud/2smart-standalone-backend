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

const OLD_SCRIPT = {
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
};

const NEW_SCRIPT = {
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
                validation: ['required', 'string', { max_length: 255 }],
                placeholder: 'Set value'
            }
        ]
    },
};

module.exports = {
    up : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, NEW_SCRIPT);
    },
    down : (queryInterface, Sequelize) => {
        return updateScript(queryInterface, Sequelize, OLD_SCRIPT);
    }
};
