'use strict';

const default_fields = [
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
  }
];

const xiaomi_conf = {
  volumes: {
    './system/ssl/certs' : '/app/lib/etc/certs'
  },
  network_mode: 'host'
};

const new_conf = {
  ...xiaomi_conf,
  fields: [
    ...default_fields,
    {
      label:'Enable TLS',
      name:'SECURE',
      type : 'boolean',
      validation: [],
      default: true
    }
  ]
};

const old_conf = {
  ...xiaomi_conf,
  fields: [
    ...default_fields,
    {
      label:'Enable TLS',
      name:'SECURE',
      type : 'string',
      validation: [],
      placeholder: 'on|off',
      default: 'on'
    }
  ]
}

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
      { configuration: old_conf },
      { type: 'xiaomi-gateway-bridge' },
      {},
      { configuration: { type: new Sequelize.JSON() } }
    ).catch((err) => {
      console.log(err);
      throw err;
    })
  }
};
