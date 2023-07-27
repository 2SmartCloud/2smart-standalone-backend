const {
    extensions : {
        projectKeyword,
        keywords,
        installPath,
        defaultSchemePath,
        refreshCacheIntervalTime
    }
}                       = require('../../../../etc/config')[process.env.MODE || 'development'];
const { dumpExtension } = require('../utils');
const ServiceBase       = require('../BaseService');
const ExtensionsService = require('./core/ExtensionsService');

class ExtensionsShow extends ServiceBase {
    static validationRules = {
        name : [ 'required', 'string' ]
    };

    constructor(props) {
        super(props);
        this.extensionsService = new ExtensionsService({
            projectKeyword,
            keywords,
            installPath,
            defaultSchemePath,
            refreshCacheIntervalTime
        });
    }

    async execute({ name }) {
        await this.middleCheckPermissions();

        const extension = await this.extensionsService.getExtensionByName(name);

        return {
            status : 1,
            data   : dumpExtension(extension) // leave only required fields
        };
    }
}

module.exports = ExtensionsShow;
