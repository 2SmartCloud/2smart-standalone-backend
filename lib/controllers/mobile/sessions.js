const chista                      = require('../../chista');
const { dumpError, errorHandler } = require('../../utils/errors');
const ValidationException         = require('../../utils/errors/ValidationException');
const ForbiddenException          = require('../../utils/errors/ForbiddenException');
const {
    validation : { FORMAT_ERROR },
    forbidden  : { WRONG_TOKEN, WRONG_SCREENS_TOKEN }
} = require('../../utils/errors/codes');

const SessionsCreate          = require('../../services/mobile/sessions/Create');
const SessionsCreateForScreen = require('../../services/mobile/sessions/CreateForScreen');
const SessionsCheck           = require('../../services/mobile/sessions/Check');

const TOKEN_HEADER         = 'x-access-token';
const SCREENS_TOKEN_HEADER = 'x-access-screens-token';

module.exports = {
    create          : chista.makeServiceRunner(SessionsCreate, req => ({ ...req.body })),
    createForScreen : chista.makeServiceRunner(SessionsCreateForScreen, req => ({ pin: req.body.pin })),
    check           : async (req, res, next) => {
        try {
            const token = req.headers[TOKEN_HEADER];
            const screensToken = req.headers[SCREENS_TOKEN_HEADER];

            const { data: { userId } } = await chista.runService(SessionsCheck, {
                params : { token }
            });

            const context = { userId };

            if (screensToken) {
                try {
                    const { data: { pin } } = await chista.runService(SessionsCheck, {
                        params : { token: screensToken }
                    });

                    context.pin = pin;
                } catch (err) {
                    throw err.code === WRONG_TOKEN ? new ForbiddenException(WRONG_SCREENS_TOKEN) : err;
                }
            }

            // eslint-disable-next-line no-param-reassign
            req.session = { context };

            return next();
        } catch (err) {
            const formattedError = err.code === FORMAT_ERROR ?
                new ValidationException(FORMAT_ERROR, err.fields) :
                err;

            const dumpedError = dumpError(formattedError);

            return errorHandler(dumpedError, req, res);
        }
    }
};
