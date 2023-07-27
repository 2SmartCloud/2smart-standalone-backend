const ScreensList = require('../../../../lib/services/admin/screens/List');
const ScreensUpdate = require('../../../../lib/services/admin/screens/Update');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : {}
};

let screenId;

jest.setTimeout(30000);

describe('ScreensUpdate service', () => {
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

    test('POSITIVE: should update screen', async () => {
        const service = new ScreensUpdate(serviceParams);
        const res = await service.run({
            id   : screenId,
            data : {
                name   : 'RENAMED SCREEN',
                layout : {
                    lg : [
                        {
                            h      : 1,
                            i      : '4bfc645f-940d-403f-9ef4-af5420b0a97b',
                            w      : 1,
                            x      : 0,
                            y      : 0,
                            moved  : false,
                            static : false
                        }
                    ]
                }
            }
        });

        expect(res).toMatchObject({
            data : {
                id       : screenId,
                name     : 'RENAMED SCREEN',
                position : 1,
                layout   : {
                    lg : [
                        {
                            h      : 1,
                            i      : '4bfc645f-940d-403f-9ef4-af5420b0a97b',
                            w      : 1,
                            x      : 0,
                            y      : 0,
                            moved  : false,
                            static : false
                        }
                    ]
                }
            }
        });
    });

    test('NEGATIVE: should throw on update screen', async () => {
        const service = new ScreensUpdate(serviceParams);

        try {
            await service.run({
                id   : screenId,
                data : {
                    name : ''
                }
            });
        } catch (e) {
            expect(e.code).toBe('FORMAT_ERROR');
        }
    });
});
