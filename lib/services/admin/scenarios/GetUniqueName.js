const { Op }           = require('sequelize');
const ServiceBase      = require('../BaseService');
const { sequelize }    = require('../../../sequelize');

const Scenarios = sequelize.model('Scenarios');

const TYPE_PREFIX = '@2smart/';
const LAST_NUMBERS_REGEXP = /\d+$/;
const ADVANCED_MODE = 'ADVANCED';
const PRO_SCENARIO_BASE_NAME = 'pro-scenario';

class ScenarioShow extends ServiceBase {
    async execute({ type, mode }) {
        await this.middleCheckPermissions();

        const baseName = this._getBaseNameFromType(type, mode);

        const numberedExtensionName = await Scenarios.findOne({
            attributes : [ 'name' ],
            where      : {
                type : mode === ADVANCED_MODE ? null : type,
                mode,
                name : {
                    [Op.regexp] : `^${baseName}-[0-9]+$`
                }
            },
            order : [ [ 'createdAt', 'DESC' ] ]
        });

        if (numberedExtensionName) {
            const number = this._getNumberFromName(numberedExtensionName.name);

            return {
                status : 1,
                data   : { name: this._createNextNumberedName(baseName, number) }
            };
        }

        return {
            status : 1,
            data   : { name: this._createFirstNumberedName(baseName) }
        };
    }

    _getBaseNameFromType(type, mode) {
        if (mode === ADVANCED_MODE) return PRO_SCENARIO_BASE_NAME;

        return type.split(TYPE_PREFIX)[1].trim();
    }

    _getNumberFromName(name) {
        const matchResult = name.match(LAST_NUMBERS_REGEXP);
        if (isNaN(Number(matchResult[0]))) {
            return null;
        }

        return matchResult ? Number(matchResult[0]) : null;
    }

    _createNextNumberedName(baseName, number) {
        if (number === null) {
            return this._createFirstNumberedName(baseName);
        }

        return `${baseName}-${number + 1}`;
    }

    _createFirstNumberedName(baseName) {
        return `${baseName}-1`;
    }
}

ScenarioShow.validationRules = {
    type : [ 'true_string' ],
    mode : [ { one_of: [ 'ADVANCED', 'SIMPLE' ] } ]
};

module.exports = ScenarioShow;
