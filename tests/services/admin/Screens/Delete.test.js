const ScreensList = require('../../../../lib/services/admin/screens/List');
const ScreensDelete = require('../../../../lib/services/admin/screens/Delete');
const ScreensCreate = require('../../../../lib/services/admin/screens/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : {}
};

let screenId;

jest.setTimeout(30000);

describe('ScreensDelete service', () => {
    beforeAll(async () => {
        await factory.cleanup();

        const service = new ScreensList(serviceParams);
        const res = await service.run({});

        screenId = res.data[0].id;
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should delete screen', async () => {
        const serviceCreate = new ScreensCreate(serviceParams);
        const serviceDelete = new ScreensDelete(serviceParams);
        const serviceList = new ScreensList(serviceParams);

        const res = await serviceCreate.run({ data: { position: 2 } });

        await serviceDelete.run({ id: res.data.id });
        const list = await serviceList.run({});

        if (list.data.filter((screen) => screen.id === res.data.id).length > 0) throw new Error('Didn\'t delete screen.');
    });

    test('NEGATIVE: should throw on deleting last screen', async () => {
        const service = new ScreensDelete(serviceParams);

        try {
            await service.run({ id: screenId });
        } catch (e) {
            expect(e.code).toBe('CAN_NOT_DELETE_LAST');
        }
    });
});
