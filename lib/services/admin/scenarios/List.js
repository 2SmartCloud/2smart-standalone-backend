const _                = require('underscore');
const ServiceBase      = require('../BaseService');
const { dumpScenario } = require('../utils.js');
const { sequelize }    = require('../../../sequelize');

const Scenarios = sequelize.model('Scenarios');

const DEFAULT_LIMIT = 1000;

/* eslint-disable camelcase */
class ScenarioList extends ServiceBase {
    async execute(data) {
        await this.middleCheckPermissions();
        const Op = require('sequelize').Op;
        const where = { ... _.pick(data, [ 'mode', 'status', 'language' ]) };

        if (data.search) {
            where[Op.or] = [
                { title: { [Op.substring]: data.search } },
                { name: { [Op.substring]: data.name } }
            ];
        }

        const order = [];
        const sortOrder = data.sortOrder || 'ASC';

        if (data.sortBy) {
            order.push([ data.sortBy, 'DESC' ]);
        }
        order.push([ 'createdAt', sortOrder ]); // default order

        const limit = data.limit || DEFAULT_LIMIT;
        const offset = data.offset || 0;
        const { rows, count } = await Scenarios.findAndCountAll({
            where,
            attributes : { exclude: [ 'script' ] },
            order,
            limit,
            offset
        });

        const res = rows.map(dumpScenario);

        return {
            status : 1,
            data   : res,
            limit,
            offset,
            total  : count
        };
    }
}

ScenarioList.validationRules = {
    mode      : [ { one_of: [ 'ADVANCED', 'SIMPLE' ] } ],
    status    : [ { one_of: [ 'ACTIVE', 'INACTIVE' ] } ],
    language  : [ { one_of: [ 'JS' ] } ],
    search    : [ 'true_string' ],
    sortBy    : [ { one_of: [ 'createdAt', 'updatedAt', 'name', 'title', 'mode', 'status', 'language' ] } ],
    sortOrder : [ { one_of: [ 'ASC', 'DESC' ] } ],
    limit     : [ 'positive_integer', { 'min_number': 1, 'max_number': 1000 } ],
    offset    : [ 'integer', { 'min_number': 0 } ]
};

module.exports = ScenarioList;
