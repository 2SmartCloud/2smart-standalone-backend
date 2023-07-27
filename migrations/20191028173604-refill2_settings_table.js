

module.exports = {
    up : (queryInterface, Sequelize) => {
        const Promise = require('bluebird');
        const sequelize = queryInterface.sequelize;

        const settings = {
            secure_mode_enabled : {
                value : false,
                type  : 'boolean'
            },
            auto_exit_full_access_mode_enabled : {
                value : true,
                type  : 'boolean'
            }
        };


        return  sequelize.query('SELECT * FROM globalsettings', { type: sequelize.QueryTypes.SELECT }).then((database_settings) => {
            const settings_to_update = [];
            const settings_to_delete = [];

            database_settings.forEach((setting) => {
                const name = setting.name;

                if (settings[name]) {
                    settings_to_update.push({ ... settings[name], name });
                    delete settings[name];
                } else {
                    settings_to_delete.push(name);
                }
            });
            const settings_to_add = [];

            for (const name in settings) {
                settings_to_add.push({ ... settings[name], name });
            }

            return Promise.each(settings_to_update, (setting) => {
                return queryInterface.bulkUpdate('globalsettings', setting, { name: setting.name });
            }).then(() => {
                if (settings_to_add.length) return queryInterface.bulkInsert('globalsettings', settings_to_add);
            }).then(() => {
                if (settings_to_delete.length) {
                    return queryInterface.bulkDelete('globalsettings', {
                        name : { [Sequelize.Op.in]: settings_to_delete }
                    });
                }
            });
        });
    },

    down : (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;


        return  sequelize.query('TRUNCATE globalsettings');
    }
};
