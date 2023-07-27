const extraRules = 'livr-extra-rules';

const _         = require('underscore');
const LIVR         = require('livr');

const uuidValidate = require('uuid-validate');

/* eslint-disable no-param-reassign */
const defaultRules = {
    'object_id'() {
        return value => {
            if (uuidValidate(value, 4)) return;

            if (value === undefined || value === null || value === '') return;
            if (typeof value !== 'string') return 'FORMAT_ERROR';
            if (value.length < 24) return 'WRONG_ID';
            if (value.length > 24) return 'WRONG_ID';
            if (value.match(/[^a-f0-9]/)) return 'WRONG_ID';
        };
    },
    'property_id'() {
        return value => {
            if (value === null) return;
            if (value && !value.match(/(^[a-z0-9]$|^[a-z0-9][a-z0-9]$|^[a-z0-9][a-z-0-9-]+[a-z0-9]$)/)) return 'WRONG_ID';
        };
    },
    'hex'() {
        return value => {
            if (!value) return;
            if (!value.match(/^#[0-9A-Fa-f]+$/)) return 'WRONG_FORMAT';
        };
    },
    'less_than'(field) {
        return (value, data) => {
            const secondaryValue = parseInt(data[field], 10);
            const primaryValue = parseInt(value, 10);
            const isValueInt = Number.isInteger(primaryValue);
            const isSecondaryValueInt = Number.isInteger(secondaryValue);

            if (!isSecondaryValueInt && !isValueInt) return;
            if (isSecondaryValueInt && !isValueInt) return 'REQUIRED';
        };
    },
    'greater_than'(field) {
        return (value, data) => {
            const secondaryValue = parseInt(data[field], 10);
            const primaryValue = parseInt(value, 10);
            const isValueInt = Number.isInteger(primaryValue);
            const isSecondaryValueInt = Number.isInteger(secondaryValue);

            if (!isSecondaryValueInt && !isValueInt) return;
            if (isSecondaryValueInt && !isValueInt) return 'REQUIRED';
            if (primaryValue <= secondaryValue) return 'TOO_LOW';
        };
    },
    'true_string'() {
        return (value, params, outputArr) => {
            if (value === undefined) return;
            if (value === null) {
                outputArr.push(value);

                return;
            }
            if ((typeof value !== 'string') && (typeof value !== 'number')) return 'NOT_STRING';
            outputArr.push(`${value}`);
        };
    },
    'primitive'() {
        return value => {
            if (value !== null && value !== undefined && !LIVR.util.isPrimitiveValue(value)) return 'NOT_PRIMITIVE';
        };
    },
    'object_with_rules_for_values'(rules) {
        const validator = new LIVR.Validator({ v: rules }).prepare();


        return (value, params, outputArr) => {
            if (typeof value !== 'object') return 'NOT_OBJECT';
            const res = {};

            for (const key in value) {
                if (!value.hasOwnProperty(key)) continue;
                const t = validator.validate({ v: value[key] });
                const errors = validator.getErrors();

                if (errors) return errors.v;
                res[key] = t.v;
            }
            outputArr.push(res);
        };
    },
    'boolean'() {
        return (value, params, outputArr) => {
            if (value === undefined) return;
            if (value === null) {
                outputArr.push(value);

                return;
            }
            if (value !== false && value !== true) return 'NOT_STRING';
            outputArr.push(value);
        };
    },
    'custom_error_code'(error_code, rule) {
        const brule = arguments[arguments.length - 1][rule].apply(null, Array.prototype.slice.call(arguments, 2));

        return (value, params, outputArr) => {
            const message = brule(value, params, outputArr);

            return (!message || !error_code) ? message : error_code;
        };
    },
    'list_unique_by'(fields) {
        if (typeof fields === 'string') fields = [ fields ];

        return (objects, params, outputArr) => {
            if (!Array.isArray(objects)) return 'FORMAT_ERROR';

            const used = {};

            const res = [];

            let waserror = false;

            for (const o of objects) {
                const hash = JSON.stringify(_.pick(o, fields));

                if (used[hash]) {
                    const obj = {};

                    for (const key of fields) obj[key] = 'UNIQUE_ERROR';

                    res.push(obj);
                    waserror = true;
                } else res.push(null);
                used[hash] = true;
            }
            if (waserror) return res;
            outputArr.push(objects);
        };
    },
    'list_min_length'(len) {
        return (objects, params, outputArr) => {
            if (!Array.isArray(objects)) return 'FORMAT_ERROR';

            if (objects.length < len) return 'MIN_LENGTH_ERROR';
            outputArr.push(objects);
        };
    },
    'required_if_empty_list'(field) {
        return (value, params) => {
            const targetArray = params[field];

            if (!Array.isArray(targetArray) || !Array.isArray(value)) return 'FORMAT_ERROR';
            if (!targetArray.length && !value.length) return 'REQUIRED';
        };
    },
    'required_if_less_than_min_number'(minValue) {
        return (value) => {
            const primaryValue = parseInt(value, 10);
            if (isNaN(value)) return 'FORMAT_ERROR';
            if (value === '') return 'REQUIRED';
            if (primaryValue < minValue) return `MIN_VALUE_IS_${minValue}`;
        };
    }
};

LIVR.Validator.registerDefaultRules({ ...defaultRules, ...extraRules });
