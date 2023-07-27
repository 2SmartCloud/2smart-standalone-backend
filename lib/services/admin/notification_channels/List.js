const ServiceBase    = require('../BaseService');
const {
    dumpNotificationChannelType
}                    = require('../utils.js');
const { sequelize }  = require('../../../sequelize');

const NotificationChannels = sequelize.model('NotificationChannels');

/* eslint-disable camelcase */
class NotificationChannelsList extends ServiceBase {
    async execute() {
        await this.middleCheckPermissions();
        const notificationChannels = await NotificationChannels.findAll({
            where : {}
        });

        const res = notificationChannels.map(dumpNotificationChannelType);

        return {
            status : 1,
            data   : res
        };
    }
}

module.exports = NotificationChannelsList;
