const jwt            = require('jsonwebtoken');
const _              = require('underscore');
const { default: X } = require('chista/Exception');

const { token: configToken } = require('../../etc/config')[process.env.MODE || 'development'];
const { sequelize }          = require('../sequelize');

const { TokenExpiredError, JsonWebTokenError } = jwt;

const Users = sequelize.model('Users');

configToken.pinAutoExitMaxAge = parseInt(configToken.pinAutoExitMaxAge, 10);
configToken.pinMaxAge = parseInt(configToken.pinMaxAge, 10);
configToken.passwordMaxAge = parseInt(configToken.passwordMaxAge, 10);

async function generateToken(data_to_sign, user) {
    // eslint-disable-next-line no-param-reassign
    data_to_sign = _.pick(data_to_sign, 'pin', 'password', 'userId', 'username');
    let secret = configToken.secret;

    let data = data_to_sign;

    // eslint-disable-next-line no-param-reassign
    if (!user && data_to_sign.userId !== undefined) user = await Users.findByPk(data.userId);
    if (user) {
        if (data_to_sign.password && user.passwordHash) {
            secret += user.passwordHash;
        }
        if (data_to_sign.username && user.username) {
            secret += user.username;
        }
        if (data_to_sign.pin && user.pinHash) {
            secret += user.pinHash;
        }
        data = { ... data_to_sign, userId: user.id };
    }

    // return jwt.sign(data, secret, { expiresIn: configToken.maxAge });
    return jwt.sign(data, secret); // do expire check is in validateToken manually
}

async function validateToken(token, throwErrors = false) {
    try {
        let secret = configToken.secret;

        const data = jwt.decode(token);

        if (!data) throw new JsonWebTokenError('invalid token');

        if (data.userId) {
            const user = await Users.findByPk(data.userId);

            if (data.password && user.passwordHash) {
                secret += user.passwordHash;
            }
            if (data.username && user.username) {
                secret += user.username;
            }
            if (data.pin && user.pinHash) {
                secret += user.pinHash;
            }
        }

        return jwt.verify(token, secret);
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            if (throwErrors) {
                throw new X({
                    code   : 'TOKEN_EXPIRED',
                    fields : {}
                });
            } else return {};
        } else if (e instanceof JsonWebTokenError && e.message === 'invalid signature') {
            if (throwErrors) {
                throw new X({
                    code   : 'INVALID_SIGNATURE',
                    fields : {}
                });
            } else return {};
        } else if (e instanceof JsonWebTokenError && e.message === 'invalid token') {
            if (throwErrors) {
                throw new X({
                    code   : 'INVALID_TOKEN',
                    fields : {}
                });
            } else return {};
        }
        throw e;
    }
}

module.exports = {
    generateToken,
    validateToken
};
