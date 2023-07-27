const chista = require('../../chista');

const UsersShowMqttCredentials = require('../../services/mobile/users/ShowMqttCredentials');

module.exports = {
    showMqttCredentials : chista.makeServiceRunner(UsersShowMqttCredentials)
};
