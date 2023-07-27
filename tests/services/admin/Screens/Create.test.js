const ScreensCreate = require('../../../../lib/services/admin/screens/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : {}
};

jest.setTimeout(30000);

describe('ScreensCreate service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should create new screen', async () => {
        const service = new ScreensCreate(serviceParams);

        const runParams = {
            position : 1
        };

        const res = await service.run({ data: runParams });

        expect(res).toMatchObject({
            data : {
                name     : `My screen ${res.data.id}`,
                position : 1,
                layout   : {}
            }
        });
    });

    test('NEGATIVE: should throw validation error', async () => {
        const service = new ScreensCreate(serviceParams);

        const runParams = {
            position : 0
        };

        try {
            await service.run({ data: runParams });
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
        }
    });
});
