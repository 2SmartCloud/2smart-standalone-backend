const BridgeTypesList = require('../../../../lib/services/admin/bridge_types/List');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

jest.setTimeout(30000);

describe('BridgeTypesList service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should show list of bridge types', async () => {
        const service = new BridgeTypesList(serviceParams);
        const res = await service.run({ data: {} });

        expect(!!res.data).toBe(true);
    });
});
