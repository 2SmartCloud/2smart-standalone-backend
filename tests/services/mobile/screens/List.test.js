const ScreensList     = require('../../../../lib/services/mobile/screens/List');
const { sequelize }   = require('../../../../lib/sequelize');
const TestFactory     = require('../../../utils');
const { fillScreens } = require('../../../utils/fillDatabase');
const screens         = require('../../../fixtures/screens');

const GlobalSettings = sequelize.model('GlobalSettings');

const factory            = new TestFactory();
const serviceArgs        = { context: {} };
const screensListService = new ScreensList(serviceArgs);

const TEST_TIMEOUT = 10000;

jest.setTimeout(TEST_TIMEOUT);

describe('mobile: screens/List service', () => {
    beforeAll(async () => {
        await factory.cleanup();

        await fillScreens();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully return list of screens', async () => {
        const result = await screensListService.run({});
        const isSecureModeEnabled = await GlobalSettings.get('secure_mode_enabled');

        expect(result.status).toBe(1);
        expect(result.data).toMatchObject({
            screens : screens.map(screen => ({
                id            : screen.id,
                title         : screen.name,
                parentControl : isSecureModeEnabled && screen.parentControl
            }))
        });
    });
});
