const X = require('chista/Exception').default;

const ServiceBase    = require('../BaseService');
const { sequelize }   = require('../../../sequelize');

const Users = sequelize.model('Users');

class ResetPassword extends ServiceBase {
    async execute({ data }) {
        await this.middleCheckPermissions();

        await sequelize.transaction(async (transaction) => {
            const user = await Users.findByPk(this.context.userId, { transaction });

            if (!await user.checkPassword(data.oldPassword)) {
                throw new X({
                    code   : 'BAD_CREDENTIALS',
                    fields : {
                        oldPassword : 'BAD_CREDENTIALS'
                    }
                });
            }
            await user.update({ password: data.newPassword }, { transaction });
        });

        return {
            status : 1,
            data   : {}
        };
    }
}

ResetPassword.validationRules = {
    data : [ 'required', {
        nested_object : {
            oldPassword        : [ 'required', 'string' ],
            newPassword        : [ 'required', 'string', { 'min_length': 5 }, { 'like': '^[a-zA-Z0-9_]+$' } ],
            newPasswordConfirm : [ 'required', 'string', { 'equal_to_field': [ 'newPassword' ] } ]
        }
    } ]
};

module.exports = ResetPassword;
