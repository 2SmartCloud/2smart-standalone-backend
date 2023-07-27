const ScreensList = require('../../../../lib/services/admin/screens/List');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : {}
};

jest.setTimeout(30000);

describe('ScreensList service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should show screens', async () => {
        const service = new ScreensList(serviceParams);
        const res = await service.run({});

        expect(res.data.length).toBe(1);
        expect(res.data[0]).toMatchObject({
            name     : 'My screen 1',
            position : 1,
            layout   : {}
        });
    });
});
