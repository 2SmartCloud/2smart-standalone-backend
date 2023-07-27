'use strict';

const SCENARIO_TEMPLATES_TABLE_NAME = 'ScenarioTemplates';

const basicTemplates = [
    {
        name : 'groups',
        code :
`scenario.init()
  .then(() => {
    const groupName = 'group-name'; // put your group name here
    const valueToSet = 'value-to-set'; // put a value your want to set to a group here
    
    scenario.setGroupValue(groupName, valueToSet);
  });`
    },
    {
        name : 'methods',
        code :
`scenario.init()
  .then(() => {
    const methodName = 'method-name'; // put method name here
    const datatype = 'string'; // put datatype for initMethod callback argument here
    const scenarioId = 'methods'; // put current scenario name here
    const valueToPassToCallbackArgument = 'value-to-pass-to-callback-argument'; // put a value you want to pass to method's callback
    
    scenario.initMethod(methodName, (value) => {
      // 
      // process the received value from scenario.callMethod here
      //
      
      console.log(value); // 'value-to-pass-to-callback-argument'
    }, datatype);
    
    scenario.callMethod(scenarioId, methodName, valueToPassToCallbackArgument);
  });`
    },
    {
        name : 'thresholds',
        code :
`scenario.init()
  .then(() => {
    const thresholdId = 'put-threshold-id-here';
    const thresholdTopic = scenario.getThresholdTopic(thresholdId); // get threshold topic by thresold ID
    
    const thresholdAttributes = {
      name: 'put-threshold-name-here',
      datatype: 'string',
      unit: '#'
    };
  
    scenario.initThreshold(thresholdId, thresholdAttributes); // initialize threshold
  
    // Subscribe on all incoming messages from broker to track changes of threshold value
    scenario.message((topic, message) => {
      if (topic === thresholdTopic) {
        const value = message.toString(); // parse buffer to string

        console.log(value);
        
        // process threshold value
        // ...
        // ...
        // ...
      }
    });
  });`
    },
    {
        name : 'influx',
        code :
`scenario.init()
  .then(async () => {
    try {
      const topic = 'put-topic-here'; // put topic you want to calculate avarage value for, using Influx
      
      const [result] = await scenario.influx.query(\`
         SELECT MEAN("number") 
         FROM "timelines" 
         WHERE ("topic"='\${topic}')
      \`);
      
      console.log(\`Average value by topic: \${result.mean}\`);
    } catch (err) {
      console.error(err);
    }
  });`
    },
    {
        name : 'aliases',
        code :
`scenario.init()
  .then(() => {
    const alias = '@aliasName'; // put topic alias here, NOTE: you must enter "@" before topic alias name
    const value = 'value-to-set'; // put a value for an alias you want to set here
    
    scenario.set(alias, value);
  });`
    }
];

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(SCENARIO_TEMPLATES_TABLE_NAME, basicTemplates);
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete(SCENARIO_TEMPLATES_TABLE_NAME, {
            where : {
                name : basicTemplates.map(template => template.name)
            }
        })
    }
};
