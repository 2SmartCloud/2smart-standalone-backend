const { default: Base } = require('chista/ServiceBase');
const { generateToken, validateToken }  = require('../../utils/jwt');

module.exports = class Create extends Base {
    async generateToken(data_to_sign, user) {
        return generateToken(data_to_sign, user);
    }
    async validateToken(token, throwErrors = false) {
        return validateToken(token, throwErrors);
    }
};
