const X                 = require('chista/Exception').default;
const ServiceBaseModule = require('chista/ServiceBase');

const ServiceBase = ServiceBaseModule.default;

class BaseService extends ServiceBase {
    constructor(args) {
        super(args);

        this.logger = args.logger;
    }

    async execute() {
        throw new Error('Execute is not implemented!');
    }

    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (!this.context || !this.context.password) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
    }
}

module.exports = BaseService;
