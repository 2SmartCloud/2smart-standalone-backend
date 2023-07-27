const AbstractException = require('./AbstractException');
const { validation }    = require('./codes');

class ValidationException extends AbstractException {
    constructor(code, payload = {}) {
        super(code, ValidationException, payload);
    }

    static get defaultError() {
        return {
            type    : 'validation',
            message : 'Validation error',
            errors  : []
        };
    }

    static get codes() {
        return {
            [validation.FORMAT_ERROR] : (fields) => ({
                ...this.defaultError,
                code    : validation.FORMAT_ERROR,
                message : 'Format error',
                errors  : Object.entries(fields).map(([ field, value ]) => ({ [field]: value }))
            }),
            [validation.INVALID_CREDENTIALS] : () => ({
                ...this.defaultError,
                code    : validation.INVALID_CREDENTIALS,
                message : 'Invalid username or password'
            }),
            [validation.INVALID_PIN] : () => ({
                ...this.defaultError,
                code    : validation.INVALID_PIN,
                message : 'Invalid pin'
            }),
            [validation.NOT_FOUND] : ({ entityName }) => ({
                ...this.defaultError,
                code    : validation.NOT_FOUND,
                message : `${entityName} not found`
            })
        };
    }
}

module.exports = ValidationException;
