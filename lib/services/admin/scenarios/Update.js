/* eslint-disable camelcase */

const LIVR = require('livr');

const {
    extensions : {
        keywords,
        installPath,
        nameStartsWith,
        defaultSchemePath,
        types
    }
} = require('../../../../etc/config')[process.env.MODE || 'development'];

const { EXTENSIONS }    = require('../../../errorCodes');
const ExtensionsService = require('../extensions/core/ExtensionsService');
const ServiceBase       = require('../BaseService');
const { dumpScenario }  = require('../utils.js');
const { sequelize }     = require('../../../sequelize');
const X                 = require('../../../X');

const Scenarios = sequelize.model('Scenarios');

class ScenarioUpdate extends ServiceBase {
    constructor(props) {
        super(props);

        this.extensionsService = new ExtensionsService({
            keywords,
            installPath,
            nameStartsWith,
            defaultSchemePath
        });
    }

    async validate(data) {
        const rules = {
            id   : [ 'required', 'primitive' ],
            data : [ 'required', { 'nested_object' : {
                title  : [ 'true_string', 'not_empty', { 'min_length': 1 }, { 'max_length': 255 } ],
                status : [ { one_of: [ 'ACTIVE', 'INACTIVE' ] } ],
                script : [ 'true_string', { 'max_length': 100000 } ]
            } } ]
        };

        const scenario = await Scenarios.findOne({ where: { id: data.id } });

        if (!scenario) {
            throw new X({
                code   : 'NOT_FOUND',
                fields : {
                    scenario : 'NOT_FOUND'
                }
            });
        }

        if (scenario.mode === 'SIMPLE') {
            const extensionName = scenario.type;

            const isExtensionInstalled = await this.extensionsService
                .isExtensionInstalled(extensionName, types.scenario);

            if (!isExtensionInstalled) {
                throw new X({
                    code   : EXTENSIONS.NOT_FOUND,
                    fields : {
                        type : EXTENSIONS.NOT_FOUND
                    }
                });
            }

            const scheme = await this.extensionsService.getExtensionConfigScheme(extensionName, types.scenario);

            const paramsRules = scheme.reduce((obj, { name, validation }) => {
                // eslint-disable-next-line no-param-reassign
                obj[name] = validation.length ? validation : [ { default: undefined } ];

                return obj;
            }, {});

            rules.data[1].nested_object.params = [ { 'nested_object': paramsRules } ];
        }

        return this.doValidation(data, rules);
    }

    doValidation(data, rules) {
        const validator = new LIVR.Validator(rules).prepare();

        return this._doValidationWithValidator(data, validator);
    }

    async _doValidationWithValidator(data, validator) {
        const result = validator.validate(data);

        if (!result) {
            const exeption = new X({
                code   : 'FORMAT_ERROR',
                fields : validator.getErrors()
            });

            throw exeption;
        }

        return result;
    }

    async execute({ id, data }) {
        await this.middleCheckPermissions();

        const scenario = await sequelize.transaction(async (transaction) => {
            // eslint-disable-next-line no-shadow
            const scenario = await Scenarios.findOne({ where: { id }, transaction });

            if (!scenario) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        scenario : 'NOT_FOUND'
                    }
                });
            }

            await scenario.update(data, { transaction });

            return scenario;
        });

        return {
            status : 1,
            data   : dumpScenario(scenario)
        };
    }
}

module.exports = ScenarioUpdate;
