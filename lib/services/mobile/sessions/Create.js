const Base                                     = require('../Base');
const { generateToken }                        = require('../../../utils/jwt');
const { sequelize }                            = require('../../../sequelize');
const ValidationException                      = require('../../../utils/errors/ValidationException');
const { validation : { INVALID_CREDENTIALS } } = require('../../../utils/errors/codes');

const Users = sequelize.model('Users');

class SessionsCreate extends Base {
    async execute({ username, password }) {
        const user = await Users.findOne({ where: { username } });

        if (!user || !await user.checkPassword(password)) {
            throw new ValidationException(INVALID_CREDENTIALS);
        }

        return {
            status : 1,
            data   : {
                jwt : await generateToken({ password: true, username: true }, user)
            }
        };
    }
}

SessionsCreate.validationRules = {
    username : [ 'required', 'string' ],
    password : [ 'required', 'string' ]
};

module.exports = SessionsCreate;
