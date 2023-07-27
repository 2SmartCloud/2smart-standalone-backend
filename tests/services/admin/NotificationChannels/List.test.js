const NotificationChannelsList = require('../../../../lib/services/admin/notification_channels/List');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

jest.setTimeout(30000);

describe('NotificationChannelsList service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should show list of notification channels', async () => {
        const service = new NotificationChannelsList(serviceParams);
        const res = await service.run({ data: {} });

        expect(!!res.data).toBe(true);
    });
});
