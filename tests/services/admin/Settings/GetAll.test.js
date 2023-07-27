const GetAllSettings = require('../../../../lib/services/admin/settings/GetAll');
const { sequelize } = require('../../../../lib/sequelize');

const TestFactory = require('../../../utils');

const GlobalSettings = sequelize.model('GlobalSettings');

const factory = new TestFactory();

const serviceParams = {
    context : {}
};

jest.setTimeout(30000);

describe('Settings/GetAll service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        await GlobalSettings.set('secure_mode_enabled', false);
        await GlobalSettings.set('auto_exit_full_access_mode_enabled', true);
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully load settings', async () => {
        const service = new GetAllSettings(serviceParams);
        const res = await service.run({});

        expect(res).toMatchObject({
            status : 1,
            data   : {
                secure_mode_enabled                : false,
                auto_exit_full_access_mode_enabled : true
            }
        });
    });
});
