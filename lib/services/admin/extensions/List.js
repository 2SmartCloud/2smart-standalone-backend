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

class ExtensionsList extends ServiceBase {
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

    async execute() {
        await this.middleCheckPermissions();

        const extensions = await this.extensionsService.getExtensions();

        return {
            status : 1,
            data   : extensions.map(dumpExtension) // leave only required fields
        };
    }
}

module.exports = ExtensionsList;
