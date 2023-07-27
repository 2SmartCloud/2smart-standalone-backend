const Base          = require('../Base');
const { mqttCreds } = require('../../../../etc/configByMode');

module.exports = class UsersShowMqttCredentials extends Base {
    async execute() {
        const mqttCredentials = {
            url      : `${mqttCreds.protocol}://${mqttCreds.host}/${mqttCreds.basepath}`,
            username : mqttCreds.username,
            password : mqttCreds.password
        };

        return {
            status : 1,
            data   : mqttCredentials
        };
    }
};
