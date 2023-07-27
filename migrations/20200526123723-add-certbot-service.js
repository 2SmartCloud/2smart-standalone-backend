
const updateScript = (queryInterface, Sequelize, bridgeType) => {
  const sequelize = queryInterface.sequelize;

  return sequelize.query(`SELECT * FROM bridgetypes WHERE type = "${bridgeType.type}"`, { type: sequelize.QueryTypes.SELECT })
      .then(arr => {
        if (arr.length) {
          return queryInterface.bulkUpdate(
              'bridgetypes',
              bridgeType,
              { id: arr[0].id },
              {},
              { configuration: { type: new Sequelize.JSON() } }
          );
        } else {
          return queryInterface.bulkInsert(
              'bridgetypes',
              [bridgeType],
              {},
              { configuration: { type: new Sequelize.JSON() }}
          );
        }
      });
};

const bridgeType = {
  title         : 'Certbot service',
  type          : 'certbot-service',
  registry      : 'registry.gitlab.webbylab.com/smarthome/certbot-service',
  configuration : {
    fields: [
      {
        label : 'Domain*',
        name  : 'DOMAIN',
        type  : 'string',
        validation: [ 'required', 'string', 'trim' ]
      },
      {
        label : 'Email*',
        name  : 'USER_EMAIL',
        type  : 'string',
        validation: ['required', 'string', 'email' ]
      },
      {
        label : 'Username (basic auth)',
        name  : 'BASIC_AUTH_USERNAME',
        type  : 'string',
        validation: [ 'string', 'trim' ]
      },
      {
        label : 'Password (basic auth)',
        name  : 'BASIC_AUTH_USERNAME',
        type  : 'string',
        validation: [ 'string', 'trim' ]
      }
    ],
    volumes: {
      './system/certbot/conf' : '/etc/letsencrypt',
      './system/certbot/www'  : '/var/www/certbot'
    },
    streamEvents: {
      'service.finish' : 'reloadNginx',
      'service.update' : 'reloadNginx'
    }
  },
  icon: 'api/static/icons/certbot.svg'
};
module.exports = {
  up : (queryInterface, Sequelize) => {
    return updateScript(queryInterface, Sequelize, bridgeType);
  },
  down : (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;

    return sequelize.query(`DELETE FROM bridgetypes WHERE type = "${bridgeType.type}"`);
  }
};
