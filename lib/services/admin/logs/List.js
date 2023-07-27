/* eslint-disable no-sync */
const fs          = require('fs');
const arraySort   = require('array-sort');
const ServiceBase = require('../BaseService');

const LOG_PATHS = [
    '/var/log/filebeat-logs/2smart-log',
    '/var/log/filebeat-logs/2smart-log.1',
    '/var/log/filebeat-logs/2smart-log.2'
];
const LOG_LEVELS = [ 'info', 'warning', 'error' ];

class LogsList extends ServiceBase {
    static validationRules = {
        search : [ 'string' ],
        order  : [ 'string', { one_of: [ 'asc', 'desc' ] } ],
        sortBy : [ 'string', { one_of: [ 'time' ] } ],
        level  : [ 'string', { one_of: [ 'error', 'warning', 'info' ] } ],
        limit  : [ 'required', 'positive_integer' ]
    };

    async execute(data) {
        await this.middleCheckPermissions();

        const res = await this.readFile(data);

        return {
            status : 1,
            data   : { ...res }
        };
    }

    async readFile(options) {
        const lines = [];
        let logs = [];
        const { search, order, sortBy, level, limit } = options;

        LOG_PATHS.forEach(path => {
            try {
                lines.push(...fs.readFileSync(path).toString().split('\n'));
            } catch (e) {
                // ignore
            }
        });

        lines.forEach(line => {
            const parsed = this.parseLine(line, { search, level });

            if (parsed) logs.push(parsed);
        });

        switch (sortBy) {
            case 'time':
                arraySort(logs, 'timestamp', { reverse: !(order && order === 'asc') });
                break;
            default:
                break;
        }

        const total = logs.length;

        logs = logs.slice(0, limit);

        return { list: logs, total };
    }

    parseLine(line, { search, level }) {
        try {
            const parsed = JSON.parse(line);
            const timestamp = parsed['@timestamp'];
            const { container: { id, name }, message, json } = parsed;

            let logLevel = 'info';

            let logMessage = message;

            if (json) {
                if (json.level && LOG_LEVELS.includes(json.level)) logLevel = json.level;
                if (json.message) logMessage = json.message;
            }

            // Filter by log level
            if (level && logLevel !== level) return;

            // Search by container name or message
            if (search && !(name.search(search) > -1 || logMessage.search(search) > -1)) return;

            return {
                containerId   : id,
                containerName : name,
                timestamp     : +new Date(timestamp),
                logLevel,
                logMessage
            };
        } catch (e) {
            // ignore line
            return;
        }
    }
}

module.exports = LogsList;
