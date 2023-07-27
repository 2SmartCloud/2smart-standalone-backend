const { UniqueConstraintError } = require('sequelize');
const LIVR                      = require('livr');

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

/* eslint-disable camelcase */
class ScenarioCreate extends ServiceBase {
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
            data : [ 'required', { 'nested_object' : {
                name : [
                    'required',
                    'not_empty',
                    'true_string',
                    { 'min_length': 1 },
                    { 'max_length': 255 },
                    { 'custom_error_code': [ 'WRONG_NAME', 'like', '^[a-z0-9-]+$' ] }
                ],
                mode     : [ { one_of: [ 'ADVANCED', 'SIMPLE' ] } ],
                title    : [ 'required', 'not_empty', 'true_string', { 'min_length': 1 }, { 'max_length': 255 } ],
                status   : [ { one_of: [ 'ACTIVE', 'INACTIVE' ] } ],
                script   : [ 'true_string', { 'max_length': 100000 } ],
                language : [ { one_of: [ 'JS' ] } ]
            } } ]
        };

        if ((data && data.data && data.data.mode) === 'SIMPLE') {
            rules.data[1].nested_object.type = [ 'required', 'string' ];

            const extensionName = data.data.type;

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

            rules.data[1].nested_object.params = [ 'required', { 'nested_object': paramsRules } ];
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

    async execute({ data }) {
        await this.middleCheckPermissions();

        let scenario;

        try {
            if (data.mode === 'SIMPLE') {
                scenario = await Scenarios.create(
                    { ...data, language: this.extensionsService.getExtensionLanguage() },
                    { returning: true, individualHooks: true }
                );
            } else {
                scenario = await Scenarios.create(data, { returning: true, individualHooks: true });
            }
        } catch (e) {
            if (e instanceof UniqueConstraintError && e.fields && e.fields.scenarios_unique_name_constr !== undefined) {
                throw new X({
                    code   : 'DUPLICATE_NAME',
                    fields : {
                        data : {
                            name : 'ALREADY_EXISTS'
                        }
                    }
                });
            } else throw e;
        }

        return {
            status : 1,
            data   : dumpScenario(scenario)
        };
    }
}

module.exports = ScenarioCreate;
