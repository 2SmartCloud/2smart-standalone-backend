const X          = require('chista/Exception').default;
const TokensBase = require('../../bases/TokensBase');

class Check extends TokensBase {
    async execute({ token }) {
        try {
            if (token) {
                // validateToken also checks expires date
                return await this.validateToken(token);
            }

            return {};
        } catch (e) {
            if (e instanceof X) {
                throw e;
            } else {
                throw new X({
                    code   : 'PERMISSION_DENIED',
                    fields : {}
                });
            }
        }
    }
}

Check.validationRules = {
    token : [ 'string' ]
};

module.exports = Check;
