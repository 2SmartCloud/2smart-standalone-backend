const _          = require('underscore');
const X          = require('chista/Exception').default;
const TokensBase = require('../../bases/TokensBase');

const { sequelize } = require('../../../sequelize');

const Users   = sequelize.model('Users');

class Create extends TokensBase {
    async validate(data) {
        const rules = {
            data : [ 'required' ]
        };

        if (data && data.data) {
            if (data.data.pin !== undefined) {
                rules.data.push({
                    nested_object : {
                        pin : [ 'required', 'string' ]
                    }
                });
            } else if (data.data.token !== undefined) {
                rules.data.push({
                    nested_object : {
                        token : [ 'required', 'string' ]
                    }
                });
            } else {
                rules.data.push({
                    nested_object : {
                        username : [ 'required', 'string' ],
                        password : [ 'required', 'string' ]
                    }
                });
            }
        }

        return this.doValidation(data, rules);
    }

    async execute({ data }) {
        const user = await Users.findOne({ where: { id: 1 } }, { individualHooks: true });

        if (!user) {
            throw new Error('No default user(user with id=1)');
        }
        let accessToken;

        if (data.password) {
            if (data.username !== user.username || !await user.checkPassword(data.password)) {
                throw new X({
                    code   : 'BAD_CREDENTIALS',
                    fields : {
                        username : 'BAD_CREDENTIALS',
                        password : 'BAD_CREDENTIALS'
                    }
                });
            }
            accessToken = await this.generateToken({ password: true, username: true }, user);
        } else if (data.pin) {
            if (!await user.checkPin(data.pin)) {
                throw new X({
                    code   : 'BAD_PIN',
                    fields : {
                        pin : 'BAD_PIN'
                    }
                });
            }
            accessToken = await this.generateToken({ pin: true }, user);
        } else if (data.token) {
            accessToken = await this.generateToken(_.omit(await this.validateToken(data.token, true), 'iat', 'exp'), user);
        }

        return {
            status : 1,
            data   : {
                accessToken
            }
        };
    }
}
module.exports = Create;
