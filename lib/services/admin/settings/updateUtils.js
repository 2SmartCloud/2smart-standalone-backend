const X = require('chista/Exception').default;

const { sequelize }   = require('../../../sequelize');

const Users = sequelize.model('Users');

const globalOptionsRules = {
    async secure_mode_enabled(value, db_options) {
        if (value === true) {
            const user = await Users.findByPk(1, db_options);

            if (!user.pinHash) {
                throw new X({
                    code   : 'USER_HAS_NO_PIN',
                    fields : {}
                });
            }
        }
    }
};

module.exports = {
    validateGlobalOptionsNewValue : async function validateGlobalOptionsNewValue(key, value, db_options) {
        if (!globalOptionsRules[key]) return;
        await globalOptionsRules[key](value, db_options);
    }
};

