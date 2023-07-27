const { sequelize } = require('./../../../lib/sequelize');
const TestFactory = require('./../../utils');

/* eslint-disable camelcase */
const factory = new TestFactory();

const GlobalSettings = sequelize.model('GlobalSettings');

jest.setTimeout(30000);

describe('Settings db model', () => {
    beforeAll(async () => {
        await factory.cleanup();
        await GlobalSettings.set('secure_mode_enabled', false);
        await GlobalSettings.set('auto_exit_full_access_mode_enabled', true);
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should find at least 2 settings ', async () => {
        const settings = await GlobalSettings.getAll();

        expect(settings).toMatchObject({
            secure_mode_enabled                : false,
            auto_exit_full_access_mode_enabled : true
        });
    });

    test('POSITIVE: get value of setting', async () => {
        const secure_mode_enabled = await GlobalSettings.get('secure_mode_enabled');

        expect(secure_mode_enabled).toBe(false);
    });

    test('POSITIVE: change setting secure_mode_enabled to true', async () => {
        await GlobalSettings.set('secure_mode_enabled', true);
        const settings = await GlobalSettings.getAll();

        expect(settings).toMatchObject({
            secure_mode_enabled : true
        });
    });
});
