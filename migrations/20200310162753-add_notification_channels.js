'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const notificationChannelsNew = [
      {
        name          : 'Telegram',
        type          : 'telegram',
        configuration : {
          fields: [
            {
              label       : 'Chat ID*',
              name        : 'chatId',
              type        : 'string',
              validation  : ['required', 'not_empty'],
              placeholder : 'Telegram chat id',
            },
            {
              label       : 'Token*',
              name        : 'token',
              type        : 'string',
              validation  : ['required', 'not_empty'],
              placeholder : 'Telegram API token',
            }
          ]
        },
        icon          : 'api/static/icons/notification_channels/telegram_icon.svg'
      },
      {
        name          : 'Slack',
        type          : 'slack',
        configuration : {
          fields: [
            {
              label       : 'Webhook*',
              name        : 'webhook',
              type        : 'string',
              validation  : ['required', 'not_empty'],
              placeholder : 'Slack API token',
            }
          ]
        },
        icon          : 'api/static/icons/notification_channels/slack_icon.svg'
      }
    ];

    return queryInterface.sequelize.query('TRUNCATE notificationchannels')
      .then(() => {
        return queryInterface.bulkInsert(
          'notificationchannels',
          notificationChannelsNew.map((notificationChannel, index) => ({
            id : index + 1,
            ...notificationChannel
          })), {}, { configuration: { type: new Sequelize.JSON() } }
        );
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('TRUNCATE notificationchannels');
  }
};
