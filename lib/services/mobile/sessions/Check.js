const Base                                          = require('../Base');
const { validateToken }                             = require('../../../utils/jwt');
const ForbiddenException                            = require('../../../utils/errors/ForbiddenException');
const { forbidden: { TOKEN_EXPIRED, WRONG_TOKEN } } = require('../../../utils/errors/codes');

class SessionsCheck extends Base {
    async execute({ token }) {
        try {
            const { userId, pin } = await validateToken(token, true);

            return {
                status : 1,
                data   : {
                    userId,
                    pin
                }
            };
        } catch (err) {
            throw new ForbiddenException(err.code === TOKEN_EXPIRED ? TOKEN_EXPIRED : WRONG_TOKEN);
        }
    }
}

SessionsCheck.validationRules = {
    token : [ 'required', 'string' ]
};

module.exports = SessionsCheck;
