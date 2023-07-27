const Base                             = require('../Base');
const { generateToken }                = require('../../../utils/jwt');
const { sequelize }                    = require('../../../sequelize');
const ValidationException              = require('../../../utils/errors/ValidationException');
const { validation : { INVALID_PIN } } = require('../../../utils/errors/codes');

const Users = sequelize.model('Users');

class SessionsCreateForScreen extends Base {
    async execute({ pin }) {
        const user = await Users.findOne({ where: { id: this.context.userId } });

        if (!await user.checkPin(pin)) {
            throw new ValidationException(INVALID_PIN);
        }

        return {
            status : 1,
            data   : {
                jwt : await generateToken({ pin: true }, user)
            }
        };
    }
}

SessionsCreateForScreen.validationRules = {
    pin : [ 'required', 'string' ]
};

module.exports = SessionsCreateForScreen;
