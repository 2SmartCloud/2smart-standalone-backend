const X          = require('chista/Exception').default;
const TokensBase = require('../../bases/TokensBase');

const { sequelize }   = require('../../../sequelize');

const Users = sequelize.model('Users');

class UsersUpdate extends TokensBase {
    /* static validationRules = {
       data : [ 'required'
            , {
               nested_object : {
                   username           : [ 'required', 'string', { 'min_length': 1 }, { 'like': '^[a-z0-9_]+$' } ],
                   oldPassword        : [ 'required', 'string' ],
                   newPassword        : [ 'required', 'string', { 'min_length': 5 } ],
                   newPasswordConfirm : [ 'required', 'string', { 'equal_to_field': [ 'newPassword' ] } ]
               }
           }
       ]
    }; */
    async validate(data) {
        const rules = {
            data : [ 'required' ]
        };

        const validation_obj = {};

        if (data && data.data) {
            if (data.data.username) {
                validation_obj.username = [ 'required', 'string', { 'min_length': 1 }, { 'like': '^[a-zA-Z0-9_]+$' } ];
            }
            if (data.data.oldPassword || data.data.newPassword || data.data.newPasswordConfirm) {
                validation_obj.oldPassword = [ 'required', 'string' ];
                validation_obj.newPassword = [ 'required', 'string', { 'min_length': 5 }, { 'like': '^[a-zA-Z0-9_]+$' } ];
                validation_obj.newPasswordConfirm = [ 'required', 'string', { 'equal_to_field': [ 'newPassword' ] } ];
            }
        }
        rules.data.push({ nested_object: validation_obj });

        return this.doValidation(data, rules);
    }

    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (!this.context || !this.context.password) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
    }

    async execute({ data }) {
        await this.middleCheckPermissions();
        let user = null;

        await sequelize.transaction(async (transaction) => {
            user = await Users.findByPk(this.context.userId, { transaction });

            const user_update = {};

            if (data.username) {
                user_update.username = data.username;
            }
            if (data.newPassword) {
                if (!await user.checkPassword(data.oldPassword)) {
                    throw new X({
                        code   : 'BAD_CREDENTIALS',
                        fields : {
                            oldPassword : 'BAD_CREDENTIALS'
                        }
                    });
                }
                user_update.password = data.newPassword;
            }
            await user.update(user_update, { transaction });
        });

        const resData = {
            pin      : !!user.pinHash,
            username : user.username
        };

        if (data.newPassword || data.username) {
            resData.newToken = await this.generateToken(this.context);
        }

        return {
            status : 1,
            data   : resData
        };
    }
}

module.exports = UsersUpdate;
