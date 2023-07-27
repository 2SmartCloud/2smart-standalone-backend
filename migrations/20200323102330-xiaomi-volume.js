'use strict';

const xiaomi_conf = {
  fields: [
    {
      label:'Device name',
      name:'DEVICE_NAME',
      type : 'string',
      validation: [],
      default: 'Xiaomi Gateway Bridge'
    },
    {
      label:'Xiaomi Gateway IP*',
      name:'DEVICE_IP',
      type : 'string',
      validation: ['required', 'string']
    },
    {
      label:'API Key*',
      name:'API_KEY',
      type : 'string',
      validation: ['required', 'string']
    },
    {
      label:'Enable TLS',
      name:'SECURE',
      type : 'string',
      validation: [],
      placeholder: 'on|off',
      default: 'on'
    }
  ],
  volumes: {
    './system/ssl/certs/ca.pem' : '/app/lib/etc/ca.pem'
  },
  network_mode: 'host'
};

const new_conf = { ...xiaomi_conf, volumes: { './system/ssl/certs' : '/app/lib/etc/certs' } };

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'bridgetypes',
      { configuration: new_conf },
      { type: 'xiaomi-gateway-bridge' },
      {},
      { configuration: { type: new Sequelize.JSON() } }
    ).catch((err) => {
      console.log(err);
      throw err;
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'bridgetypes',
      { configuration: xiaomi_conf },
      { type: 'xiaomi-gateway-bridge' },
      {},
      { configuration: { type: new Sequelize.JSON() } }
    ).catch((err) => {
      console.log(err);
      throw err;
    })
  }
};
