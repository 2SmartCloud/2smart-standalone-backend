const AbstractException = require('./AbstractException');
const { forbidden }     = require('./codes');

class ForbiddenException extends AbstractException {
    constructor(code, payload = {}) {
        super(code, ForbiddenException, payload);
    }

    static get defaultError() {
        return {
            type    : 'forbidden',
            message : 'Forbidden error',
            errors  : []
        };
    }

    static get codes() {
        return {
            [forbidden.TOKEN_EXPIRED] : () => ({
                ...this.defaultError,
                code    : forbidden.TOKEN_EXPIRED,
                message : 'Token expired'
            }),
            [forbidden.WRONG_TOKEN] : () => ({
                ...this.defaultError,
                code    : forbidden.WRONG_TOKEN,
                message : 'Wrong token'
            }),
            [forbidden.WRONG_SCREENS_TOKEN] : () => ({
                ...this.defaultError,
                code    : forbidden.WRONG_SCREENS_TOKEN,
                message : 'Wrong screens token'
            }),
            [forbidden.PERMISSION_DENIED] : () => ({
                ...this.defaultError,
                code    : forbidden.PERMISSION_DENIED,
                message : 'Permission denied'
            })
        };
    }
}

module.exports = ForbiddenException;
