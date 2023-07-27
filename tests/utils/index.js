const { sequelize } = require('../../lib/sequelize.js');

class TestFactory {
    constructor() {
        if (process.env.MODE !== 'test') throw new Error('Wrong mode');
        if (!sequelize.config.database.match(/test/i)) throw new Error(`DATABASE [${sequelize.config.database}] DOES NOT HAVE "test" IN ITS NAME`);
    }

    async cleanup({ excludeModels = [] } = {}) {
        await this._dropDatabase(excludeModels);
    }

    async end() {
        await sequelize.close();
    }

    async _dropDatabase(excludeModels) {
        const {
            Users,
            Topics,
            Widgets,
            Screens,
            Scenarios
        } = sequelize.models;

        const models = {
            Users,
            Topics,
            Widgets,
            Screens,
            Scenarios
        };

        for (const [ modelName, Model ] of Object.entries(models)) {
            if (excludeModels.includes(modelName)) continue;

            await Model.destroy({ where: {}, force: true });
        }

        const GlobalSettings = sequelize.model('GlobalSettings');

        await GlobalSettings.set('secure_mode_enabled', false);
        await GlobalSettings.set('auto_exit_full_access_mode_enabled', true);
        await Users.create({ id: 1, password: '2Smart', name: 'admin', username: 'admin' });
    }
}

module.exports = TestFactory;
