const EXTENSIONS_KEYWORDS = process.env.EXTENSIONS_KEYWORDS ?
    process.env.EXTENSIONS_KEYWORDS.split(';') :
    [ 'simple-scenario' ];

module.exports = {
    development : {
        token : {
            secret            : process.env.JWT_TOKEN_SECRET,
            pinAutoExitMaxAge : process.env.JWT_TOKEN_AUTO_EXIT_PIN_MAX_AGE,
            pinMaxAge         : process.env.JWT_TOKEN_PIN_MAX_AGE,
            passwordMaxAge    : process.env.JWT_TOKEN_PASSWORD_MAX_AGE
        },
        extensions : {
            projectKeyword           : process.env.EXTENSIONS_PROJECT_KEYWORD || '2smart',
            keywords                 : EXTENSIONS_KEYWORDS,
            installPath              : process.env.EXTENSIONS_INSTALL_PATH,
            iconsDirName             : process.env.EXTENSIONS_ICONS_DIR_NAME,
            defaultSchemePath        : '/etc/scheme.json',
            refreshCacheIntervalTime : 600000,
            types                    : {
                scenario : 'simple-scenario'
            }
        },
        mqttCreds : {
            uri      : process.env.MQTT_URI  || 'mqtt://localhost:1883',
            username : process.env.MQTT_USER || '',
            password : process.env.MQTT_PASS || '',
            protocol : process.env.MQTT_PROTOCOL || 'ws',
            host     : process.env.MQTT_HOST || 'localhost',
            basepath : process.env.MQTT_BASEPATH || 'mqtt'
        },
        changelogs : {
            path  : process.env.CHANGELOGS_PATH,
            files : {
                current  : 'current.md',
                previous : 'previous.md',
                old      : 'old.md'
            }
        }
    },
    test : {
        token : {
            secret            : process.env.TEST_JWT_TOKEN_SECRET,
            pinAutoExitMaxAge : process.env.TEST_JWT_AUTO_EXIT_PIN_MAX_AGE,
            pinMaxAge         : process.env.TEST_JWT_TOKEN_PIN_MAX_AGE,
            passwordMaxAge    : process.env.TEST_JWT_TOKEN_PASSWORD_MAX_AGE
        },
        extensions : {
            projectKeyword           : process.env.EXTENSIONS_PROJECT_KEYWORD || '2smart',
            keywords                 : EXTENSIONS_KEYWORDS,
            installPath              : process.env.EXTENSIONS_INSTALL_PATH,
            iconsDirName             : process.env.EXTENSIONS_ICONS_DIR_NAME,
            defaultSchemePath        : '/etc/scheme.json',
            refreshCacheIntervalTime : 600000,
            types                    : {
                scenario : 'simple-scenario'
            }
        },
        mqttCreds : {
            uri      : process.env.MQTT_URI  || 'mqtt://localhost:1883',
            username : process.env.MQTT_USER || '',
            password : process.env.MQTT_PASS || '',
            protocol : process.env.MQTT_PROTOCOL || 'ws',
            host     : process.env.MQTT_HOST || 'localhost',
            basepath : process.env.MQTT_BASEPATH || 'mqtt'
        },
        changelogs : {
            path  : process.env.CHANGELOGS_PATH,
            files : {
                current  : 'current.md',
                previous : 'previous.md',
                old      : 'old.md'
            }
        }
    },
    production : {
        token : {
            secret            : process.env.JWT_TOKEN_SECRET,
            pinAutoExitMaxAge : process.env.JWT_TOKEN_AUTO_EXIT_PIN_MAX_AGE,
            pinMaxAge         : process.env.JWT_TOKEN_PIN_MAX_AGE,
            passwordMaxAge    : process.env.JWT_TOKEN_PASSWORD_MAX_AGE
        },
        extensions : {
            projectKeyword           : process.env.EXTENSIONS_PROJECT_KEYWORD || '2smart',
            keywords                 : EXTENSIONS_KEYWORDS,
            installPath              : process.env.EXTENSIONS_INSTALL_PATH,
            iconsDirName             : process.env.EXTENSIONS_ICONS_DIR_NAME,
            defaultSchemePath        : '/etc/scheme.json',
            refreshCacheIntervalTime : 600000,
            types                    : {
                scenario : 'simple-scenario'
            }
        },
        mqttCreds : {
            uri      : process.env.MQTT_URI  || 'mqtt://localhost:1883',
            username : process.env.MQTT_USER || '',
            password : process.env.MQTT_PASS || '',
            protocol : process.env.MQTT_PROTOCOL || 'ws',
            host     : process.env.MQTT_HOST || 'localhost',
            basepath : process.env.MQTT_BASEPATH || 'mqtt'
        },
        changelogs : {
            path  : process.env.CHANGELOGS_PATH,
            files : {
                current  : 'current.md',
                previous : 'previous.md',
                old      : 'old.md'
            }
        }
    }
};
