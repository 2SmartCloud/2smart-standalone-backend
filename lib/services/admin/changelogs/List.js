/* eslint-disable no-sync */
const fs = require('fs');
const {
    changelogs : { path, files }
} = require('../../../../etc/config')[process.env.MODE || 'development'];

const ServiceBase = require('../BaseService');

class ExtensionsList extends ServiceBase {
    async execute() {
        await this.middleCheckPermissions();

        const data = {};

        Object.keys(files).forEach(version => {
            const filepath = `${path}/${files[version]}`;

            try {
                data[version] = fs.readFileSync(filepath, 'utf-8');
            } catch (e) {
                data[version] = '';
            }
        });

        return {
            status : 1,
            data
        };
    }
}

module.exports = ExtensionsList;
