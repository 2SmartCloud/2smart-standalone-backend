const chista = require('../../chista');

const UsersResetPassword = require('../../services/admin/users/ResetPassword');
const UsersSetPin = require('../../services/admin/users/SetPin');
const UsersInfo = require('../../services/admin/users/Info');
const UsersUpdate = require('../../services/admin/users/Update');

module.exports = {
    info          : chista.makeServiceRunner(UsersInfo, req => req.query),
    setPin        : chista.makeServiceRunner(UsersSetPin, req => req.body),
    resetPassword : chista.makeServiceRunner(UsersResetPassword, req => req.body),
    update        : chista.makeServiceRunner(UsersUpdate, req => req.body)
};
