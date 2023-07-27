const chista = require('../../chista');
const Check  = require('../../services/admin/sessions/Check');
const Create = require('../../services/admin/sessions/Create');

module.exports = {
    create : chista.makeServiceRunner(Create, req => (req.body)),
    async check(req, res, next) {
        const promise = chista.runService(Check, {
            params : { token: req.get('x-access-token') }
        });

        try {
            const sessionData = await promise;

            // eslint-disable-next-line no-param-reassign
            req.session = {
                context : sessionData
            };

            return next();
        } catch (e) {
            return chista.renderPromiseAsJson(req, res, promise);
        }
    }
};
