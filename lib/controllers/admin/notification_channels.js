const chista = require('../../chista');

const NotificationChannelsList = require('../../services/admin/notification_channels/List');

module.exports = {
    list : chista.makeServiceRunner(NotificationChannelsList, req => req.query)
};
