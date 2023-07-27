'use strict';

const NEW_BRIDGE_TYPES = [
    {
        type: 'knx-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'KNX Bridge',
                    validation: []
                },
                {
                    name: 'KNX_CONNECTION_IP_ADDR',
                    type: 'string',
                    label: 'Connection IP*',
                    validation: [ 'required', 'string', { like: '^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$' } ]
                },
                {
                    name: 'KNX_CONNECTION_IP_PORT',
                    type: 'integer',
                    label: 'Connection port*',
                    default: 3671,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'KNX_CONNECTION_PHYS_ADDR',
                    type: 'string',
                    label: 'Physical address of the ip interface*',
                    validation: [ 'required', 'string' ],
                    placeholder: '1.1.1'
                },
                {
                    name: 'KNX_CONNECTION_LOCAL_PORT_BINDING',
                    type: 'integer',
                    label: 'Local Port*',
                    default: 3672,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'KNX_CONNECTION_LOCAL_IP',
                    type: 'string',
                    label: 'Local IP*',
                    validation: [ 'required', 'string', { like: '^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$' } ]
                },
                {
                    name: 'DEBUG',
                    type: 'string',
                    label: 'Debug',
                    default: null
                },
                {
                    name: 'nodes.config',
                    type: 'json',
                    label: 'Nodes Configuration*',
                    default: { nodes: [], extensions: { mapping: {} } },
                    validation: [ 'required', 'any_object' ]
                }
            ]
        }
    },
    {
        type: 'modbus-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'Modbus Bridge',
                    validation: []
                },
                {
                    name: 'MODBUS_CONNECTION_IP',
                    type: 'string',
                    label: 'Connection IP*',
                    validation: [ 'required', 'string', { like: '^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$' } ]
                },
                {
                    name: 'MODBUS_CONNECTION_PORT',
                    type: 'integer',
                    label: 'Connection port*',
                    default: 502,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'POLL_INTERVAL',
                    type: 'integer',
                    label: 'Poll interval*',
                    default: 5000,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'DEBUG',
                    type: 'string',
                    label: 'Debug',
                    default: null
                },
                {
                    name: 'nodes.config',
                    type: 'modbus-config',
                    label: 'Nodes Configuration*',
                    default: { nodes: [ { id: '', hardware: '' } ] },
                    hardwares: [
                        'MB2DI2RO',
                        'MB4RTD',
                        'MB8ROModule.ModbusRTU.Relay.12',
                        'meter.LE-01M',
                        'ModbusRTU.Relay.RS485RB.1',
                        'ModbusRTU.Relay.RS485RB.2',
                        'ModbusRTU.Relay.RS485RB.4',
                        'ModbusRTU.Relay.RS485RB.8',
                        'ModbusRTU.Relay.with.DIP.RS485RB.1',
                        'ModbusRTU.Relay.with.DIP.RS485RB.2',
                        'ModbusRTU.Relay.with.DIP.RS485RB.4',
                        'ModbusRTU.Relay.with.DIP.RS485RB.8',
                        'thermometer.SHT20',
                        'thermometer.sm100',
                        'thermometer.t10s-b',
                        'thermometer.XY-MD02',
                        'WP3082ADAM',
                        'WP3084ADAM',
                        'WP8025ADAM',
                        'WP8027ADAM',
                        'YDTH-06',
                        'SDM630MCT',
                        'Heat_calculator_TVK-01',
                        'PD3060',
                        'Mercury230_viaAdapter',
                        'Tonifishi.4AO'
                    ],
                    validation: [
                        'required',
                        {
                            nested_object: {
                                nodes: [
                                    'required',
                                    {
                                        list_of_objects: {
                                            id: [
                                                'required',
                                                'positive_integer',
                                                { min_number: 1 },
                                                { max_number: 255 }
                                            ],
                                            hardware: [
                                                'required',
                                                {
                                                    one_of: [
                                                        'MB2DI2RO',
                                                        'MB4RTD',
                                                        'MB8ROModule.ModbusRTU.Relay.12',
                                                        'meter.LE-01M',
                                                        'ModbusRTU.Relay.RS485RB.1',
                                                        'ModbusRTU.Relay.RS485RB.2',
                                                        'ModbusRTU.Relay.RS485RB.4',
                                                        'ModbusRTU.Relay.RS485RB.8',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.1',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.2',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.4',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.8',
                                                        'thermometer.SHT20',
                                                        'thermometer.sm100',
                                                        'thermometer.t10s-b',
                                                        'thermometer.XY-MD02',
                                                        'WP3082ADAM',
                                                        'WP3084ADAM',
                                                        'WP8025ADAM',
                                                        'WP8027ADAM',
                                                        'YDTH-06',
                                                        'SDM630MCT',
                                                        'Heat_calculator_TVK-01',
                                                        'PD3060',
                                                        'Mercury230_viaAdapter',
                                                        'Tonifishi.4AO'
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    { list_unique_by: 'id' },
                                    { list_min_length: 1 }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        type: 'xiaomi-gateway-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'Xiaomi Gateway Bridge',
                    validation: []
                },
                {
                    name: 'DEVICE_IP',
                    type: 'string',
                    label: 'Xiaomi Gateway IP*',
                    validation: [ 'required', 'string', { like: '^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$' } ]
                },
                {
                    name: 'API_KEY',
                    type: 'string',
                    label: 'API Key*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'SECURE',
                    type: 'boolean',
                    label: 'Enable TLS',
                    default: true,
                    validation: []
                }
            ],
            volumes: { './system/ssl/certs': '/app/lib/etc/certs' },
            network_mode: 'host'
        }
    },
    {
        type: 'zigbee-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'Zigbee Bridge',
                    validation: []
                },
                {
                    name: 'ZIGBEE_CONNECTION_IP',
                    type: 'string',
                    label: 'Connection IP*',
                    validation: [ 'required', 'string', { like: '^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$' } ]
                },
                {
                    name: 'ZIGBEE_CONNECTION_PORT',
                    type: 'integer',
                    label: 'Connection port*',
                    default: 1775,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'ZIGBEE_CHANNEL',
                    type: 'enum',
                    label: 'Zigbee channel',
                    format: [
                        { label: '11', value: 11 },
                        { label: '12', value: 12 },
                        { label: '13', value: 13 },
                        { label: '14', value: 14 },
                        { label: '15', value: 15 },
                        { label: '16', value: 16 },
                        { label: '17', value: 17 },
                        { label: '18', value: 18 },
                        { label: '19', value: 19 },
                        { label: '20', value: 20 },
                        { label: '21', value: 21 },
                        { label: '22', value: 22 },
                        { label: '23', value: 23 },
                        { label: '24', value: 24 },
                        { label: '25', value: 25 }
                    ],
                    default: 11,
                    validation: [ 'required', 'integer', { number_between: [ 11, 25 ] } ]
                },
                {
                    name: 'DEBUG',
                    type: 'string',
                    label: 'Debug',
                    default: null
                }
            ],
            volumes: { '{BRIDGE}/herdsman': '/etc/herdsman' }
        }
    }
];

const OLD_BRIDGE_TYPES = [
    {
        type: 'knx-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'KNX Bridge',
                    validation: []
                },
                {
                    name: 'KNX_CONNECTION_IP_ADDR',
                    type: 'string',
                    label: 'Connection IP*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'KNX_CONNECTION_IP_PORT',
                    type: 'integer',
                    label: 'Connection port*',
                    default: 3671,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'KNX_CONNECTION_PHYS_ADDR',
                    type: 'string',
                    label: 'Physical address of the ip interface*',
                    validation: [ 'required', 'string' ],
                    placeholder: '1.1.1'
                },
                {
                    name: 'KNX_CONNECTION_LOCAL_PORT_BINDING',
                    type: 'integer',
                    label: 'Local Port*',
                    default: 3672,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'KNX_CONNECTION_LOCAL_IP',
                    type: 'string',
                    label: 'Local IP*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'DEBUG',
                    type: 'string',
                    label: 'Debug',
                    default: null
                },
                {
                    name: 'nodes.config',
                    type: 'json',
                    label: 'Nodes Configuration*',
                    default: { nodes: [], extensions: { mapping: {} } },
                    validation: [ 'required', 'any_object' ]
                }
            ]
        }
    },
    {
        type: 'modbus-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'Modbus Bridge',
                    validation: []
                },
                {
                    name: 'MODBUS_CONNECTION_IP',
                    type: 'string',
                    label: 'Connection IP*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'MODBUS_CONNECTION_PORT',
                    type: 'integer',
                    label: 'Connection port*',
                    default: 502,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'POLL_INTERVAL',
                    type: 'integer',
                    label: 'Poll interval*',
                    default: 5000,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'DEBUG',
                    type: 'string',
                    label: 'Debug',
                    default: null
                },
                {
                    name: 'nodes.config',
                    type: 'modbus-config',
                    label: 'Nodes Configuration*',
                    default: { nodes: [ { id: '', hardware: '' } ] },
                    hardwares: [
                        'MB2DI2RO',
                        'MB4RTD',
                        'MB8ROModule.ModbusRTU.Relay.12',
                        'meter.LE-01M',
                        'ModbusRTU.Relay.RS485RB.1',
                        'ModbusRTU.Relay.RS485RB.2',
                        'ModbusRTU.Relay.RS485RB.4',
                        'ModbusRTU.Relay.RS485RB.8',
                        'ModbusRTU.Relay.with.DIP.RS485RB.1',
                        'ModbusRTU.Relay.with.DIP.RS485RB.2',
                        'ModbusRTU.Relay.with.DIP.RS485RB.4',
                        'ModbusRTU.Relay.with.DIP.RS485RB.8',
                        'thermometer.SHT20',
                        'thermometer.sm100',
                        'thermometer.t10s-b',
                        'thermometer.XY-MD02',
                        'WP3082ADAM',
                        'WP3084ADAM',
                        'WP8025ADAM',
                        'WP8027ADAM',
                        'YDTH-06',
                        'SDM630MCT',
                        'Heat_calculator_TVK-01',
                        'PD3060',
                        'Mercury230_viaAdapter',
                        'Tonifishi.4AO'
                    ],
                    validation: [
                        'required',
                        {
                            nested_object: {
                                nodes: [
                                    'required',
                                    {
                                        list_of_objects: {
                                            id: [
                                                'required',
                                                'positive_integer',
                                                { min_number: 1 },
                                                { max_number: 255 }
                                            ],
                                            hardware: [
                                                'required',
                                                {
                                                    one_of: [
                                                        'MB2DI2RO',
                                                        'MB4RTD',
                                                        'MB8ROModule.ModbusRTU.Relay.12',
                                                        'meter.LE-01M',
                                                        'ModbusRTU.Relay.RS485RB.1',
                                                        'ModbusRTU.Relay.RS485RB.2',
                                                        'ModbusRTU.Relay.RS485RB.4',
                                                        'ModbusRTU.Relay.RS485RB.8',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.1',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.2',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.4',
                                                        'ModbusRTU.Relay.with.DIP.RS485RB.8',
                                                        'thermometer.SHT20',
                                                        'thermometer.sm100',
                                                        'thermometer.t10s-b',
                                                        'thermometer.XY-MD02',
                                                        'WP3082ADAM',
                                                        'WP3084ADAM',
                                                        'WP8025ADAM',
                                                        'WP8027ADAM',
                                                        'YDTH-06',
                                                        'SDM630MCT',
                                                        'Heat_calculator_TVK-01',
                                                        'PD3060',
                                                        'Mercury230_viaAdapter',
                                                        'Tonifishi.4AO'
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    { list_unique_by: 'id' },
                                    { list_min_length: 1 }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        type: 'xiaomi-gateway-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'Xiaomi Gateway Bridge',
                    validation: []
                },
                {
                    name: 'DEVICE_IP',
                    type: 'string',
                    label: 'Xiaomi Gateway IP*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'API_KEY',
                    type: 'string',
                    label: 'API Key*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'SECURE',
                    type: 'boolean',
                    label: 'Enable TLS',
                    default: true,
                    validation: []
                }
            ],
            volumes: { './system/ssl/certs': '/app/lib/etc/certs' },
            network_mode: 'host'
        }
    },
    {
        type: 'zigbee-bridge',
        configuration: {
            fields: [
                {
                    name: 'DEVICE_NAME',
                    type: 'string',
                    label: 'Device name',
                    default: 'Zigbee Bridge',
                    validation: []
                },
                {
                    name: 'ZIGBEE_CONNECTION_IP',
                    type: 'string',
                    label: 'Connection IP*',
                    validation: [ 'required', 'string' ]
                },
                {
                    name: 'ZIGBEE_CONNECTION_PORT',
                    type: 'integer',
                    label: 'Connection port*',
                    default: 1775,
                    validation: [ 'required', 'positive_integer' ]
                },
                {
                    name: 'ZIGBEE_CHANNEL',
                    type: 'enum',
                    label: 'Zigbee channel',
                    format: [
                        { label: '11', value: 11 },
                        { label: '12', value: 12 },
                        { label: '13', value: 13 },
                        { label: '14', value: 14 },
                        { label: '15', value: 15 },
                        { label: '16', value: 16 },
                        { label: '17', value: 17 },
                        { label: '18', value: 18 },
                        { label: '19', value: 19 },
                        { label: '20', value: 20 },
                        { label: '21', value: 21 },
                        { label: '22', value: 22 },
                        { label: '23', value: 23 },
                        { label: '24', value: 24 },
                        { label: '25', value: 25 }
                    ],
                    default: 11,
                    validation: [ 'required', 'integer', { number_between: [ 11, 25 ] } ]
                },
                {
                    name: 'DEBUG',
                    type: 'string',
                    label: 'Debug',
                    default: null
                }
            ],
            volumes: { '{BRIDGE}/herdsman': '/etc/herdsman' }
        }
    }
];

module.exports = {
    up: async (queryInterface) => {
        await Promise.all(
            NEW_BRIDGE_TYPES.map(bridgeType => queryInterface.bulkUpdate(
                'bridgetypes',
                bridgeType,
                { type: bridgeType.type }
            ))
        );
    },

    down: async (queryInterface) => {
        await Promise.all(
            OLD_BRIDGE_TYPES.map(bridgeType => queryInterface.bulkUpdate(
                'bridgetypes',
                bridgeType,
                { type: bridgeType.type }
            ))
        );
    }
};
