const NPM = require('extensions-manager-sdk/src/npm/index.js');

/**
 * ExtensionsService is a singleton class which provides API for work with extensions
 */
class ExtensionsService {
    constructor({
        projectKeyword,
        keywords,
        installPath,
        defaultSchemePath,
        refreshCacheIntervalTime = 600000
    }) {
        const { instance } = ExtensionsService;
        if (instance) return instance;

        ExtensionsService.instance = this; // make a singleton class
        this.extensionsManager = new NPM({
            extensionTypes : keywords,
            installPath,
            defaultSchemePath
        });
        this.keywords = keywords; // keywords to determine extension type
        // keywords to find extensions related to 2smart project
        this.searchKeywords = [ ...this.keywords, projectKeyword ];
        this.cache = [];
        this.refreshCacheIntervalTime = refreshCacheIntervalTime;
        this.refreshCache = this.refreshCache.bind(this);
        this.refreshCacheInterval = setInterval(this.refreshCache, this.refreshCacheIntervalTime);
    }

    async refreshCache() {
        this.cache = await this.getExtensions(false);
    }

    static getInstance() {
        return ExtensionsService.instance;
    }

    /**
     * Returns extensions which satisfy search options
     * @returns {Promise<*>}   - Extensions which are satisfied by search options and not installed yet
     */
    async getExtensions(fromCache = true) {
        if (fromCache && this.cache.length) return this.cache;

        const allExtensions = await this.extensionsManager.searchExtensions('', {
            keywords : this.searchKeywords
        });

        this.cache = allExtensions.reduce((acc, extension) => {
            const extensionType = this.findExtensionType(extension.package.keywords);

            if (extensionType) { // add extension to result array only if could determine the extension type
                acc.push({
                    name        : extension.package.name,
                    version     : extension.package.version,
                    description : extension.package.description,
                    link        : extension.package.links.npm,
                    type        : extensionType,
                    language    : this.extensionsManager.getLanguage()
                });
            }

            return acc;
        }, []);

        return this.cache;
    }

    async getExtensionByName(extensionName) {
        const extension = await this.extensionsManager.searchExtensionByName(extensionName);
        if (!extension || !extension.keywords) return {};
        const extensionType = this.findExtensionType(extension.keywords);

        return extensionType ?
            {
                name        : extension.name,
                version     : extension.version,
                description : extension.description,
                link        : this.extensionsManager.getExtensionInfoURL(extensionName),
                type        : extensionType,
                language    : this.extensionsManager.getLanguage()
            } :
            {};
    }

    // determine the extension type by first keyword match
    findExtensionType(extKeywords) {
        return extKeywords.find(keyword => this.keywords.includes(keyword));
    }

    isExtensionInstalled(extensionName, type = '') {
        return this.extensionsManager.isExtensionInstalled(extensionName, type);
    }

    getExtensionConfigScheme(extensionName, type = '') {
        return this.extensionsManager.getExtensionScheme(extensionName, type);
    }

    getExtensionLanguage() {
        return this.extensionsManager.getLanguage();
    }
}

module.exports = ExtensionsService;
