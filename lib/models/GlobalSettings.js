const _ = require('underscore');
const Sequelize = require('sequelize');
const sequelize = require('../sequelizeSingleton');

class GlobalSettings extends Sequelize.Model {}

function formatValue(text, type) {
    if (!text) return text;
    if (type === 'json') return JSON.parse(text);
    if (type === 'boolean') return Boolean(JSON.parse(text));
    if (type === 'number') return Number(text);
    if (type === 'date') return new Date(text);
    if (type === 'string') return text;

    return text;
}
function stringifyValue(value) {
    if (value instanceof Date) return `${value}`;
    if (typeof value === 'object') return JSON.stringify(value);

    return `${value}`;
}

GlobalSettings.init({
    name      : { type: Sequelize.STRING, primaryKey: true },
    value     : { type: Sequelize.TEXT },
    type      : { type: Sequelize.ENUM('string', 'number', 'boolean', 'json', 'date'), allowNull: false },
    createdAt : { type: Sequelize.DATE(3) },
    updatedAt : { type: Sequelize.DATE(3) }
}, { sequelize });

GlobalSettings.initRelation = function initRelation() {
};
GlobalSettings.set = async function setGlobalSetting(name, value, options) {
    const results = await this.update({ value: stringifyValue(value) }, _.defaults({
        where     : { name },
        returning : true
    }, options));

    if (results[1] !== 1) throw new Error('Wrong name.');
};
GlobalSettings.get = async function getGlobalSetting(name, options) {
    const setting = await this.findByPk(name, _.defaults({}, options));

    if (!setting) return null;

    return formatValue(setting.value, setting.type);
};
GlobalSettings.getAll = async function getGlobalSetting(options) {
    const settings = await this.findAll(_.defaults({}, options));

    const res = {};

    settings.forEach((setting) => {
        res[setting.name] = formatValue(setting.value, setting.type);
    });

    return res;
};

module.exports = GlobalSettings;
