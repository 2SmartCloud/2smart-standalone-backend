const ServiceBase    = require('../BaseService');
const { sequelize }   = require('../../../sequelize');

const Users = sequelize.model('Users');

class Info extends ServiceBase {
    async execute() {
        await this.middleCheckPermissions();

        const user = await Users.findByPk(1);

        return {
            status : 1,
            data   : {
                pin      : !!user.pinHash,
                username : user.username
            }
        };
    }
}

Info.validationRules = {};

module.exports = Info;
