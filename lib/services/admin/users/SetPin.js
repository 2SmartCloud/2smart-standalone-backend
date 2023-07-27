const ServiceBase    = require('../BaseService');
const { sequelize }   = require('../../../sequelize');

const Users = sequelize.model('Users');

class SetPin extends ServiceBase {
    async execute({ data }) {
        await this.middleCheckPermissions();

        await sequelize.transaction(async (transaction) => {
            const user = await Users.findByPk(1, { transaction });

            await user.update({ pin: data.pin }, { transaction });
        });

        return {
            status : 1,
            data   : {}
        };
    }
}

SetPin.validationRules = {
    data : [ 'required', {
        nested_object : {
            pin        : [ 'required', 'string', { 'min_length': 6 }, { 'max_length': 6 }, { 'like': '^\\d{6}$' } ],
            pinConfirm : [ 'required', 'string', { 'equal_to_field': [ 'pin' ] } ]
        }
    } ]
};

module.exports = SetPin;
