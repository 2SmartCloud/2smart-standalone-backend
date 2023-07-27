const WidgetsCreate = require('../../../../lib/services/admin/widgets/Create');
const ScreensList = require('../../../../lib/services/admin/screens/List');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

let screenId;
const serviceParams = {
    context : {}
};

jest.setTimeout(30000);

describe('WidgetsCreate service', () => {
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

    test('POSITIVE: should create new widget', async () => {
        const service = new WidgetsCreate(serviceParams);

        const runParams = {
            topics : [
                {
                    topic        : 'test/device-id/$telemetry/property-id',
                    topicName    : 'topic-name',
                    dataType     : 'integer',
                    deviceId     : 'device-id',
                    propertyId   : 'property-id',
                    hardwareType : 'device',
                    propertyType : 'sensors',
                    order        : 1
                }
            ],
            bgColor : '#ffffff',
            name    : 'asdf',
            screen  : screenId,
            type    : 'string'
        };

        const res = await service.run({ data: runParams });

        expect(res).toMatchObject({
            data : {
                topics : [
                    'test/device-id/$telemetry/property-id'
                ],
                bgColor : '#ffffff',
                name    : 'asdf',
                type    : 'string'
            }
        });
    });

    test('NEGATIVE: should throw create widget validation error', async () => {
        const service = new WidgetsCreate(serviceParams);

        const runParams = {
            topics : [
                {
                    topic        : 'test/device-id/$telemetry/property-id',
                    topicName    : 'topic-name',
                    dataType     : 'integer',
                    deviceId     : 'device-id',
                    propertyId   : 'property-id',
                    hardwareType : 'wrong-type', // not allowed type
                    propertyType : 'sensors',
                    order        : 1
                }
            ],
            bgColor : '#ffffff',
            name    : 'asdf',
            screen  : screenId,
            type    : 'string'
        };

        try {
            await service.run({ data: runParams });
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
            expect(e.fields).toEqual({
                'data/topics/0/hardwareType' : 'NOT_ALLOWED_VALUE'
            });
        }
    });

    test('NEGATIVE: should throw screen validation error', async () => {
        const service = new WidgetsCreate(serviceParams);

        const runParams = {
            topics : [
                {
                    topic        : 'test/device-id/$telemetry/property-id',
                    topicName    : 'topic-name',
                    dataType     : 'integer',
                    deviceId     : 'device-id',
                    propertyId   : 'property-id',
                    hardwareType : 'device',
                    propertyType : 'sensors',
                    order        : 1
                }
            ],
            bgColor : '#ffffff',
            name    : 'asdf',
            screen  : 2345, // non-existent screen
            type    : 'string'
        };

        try {
            await service.run({ data: runParams });
        } catch (e) {
            expect(e.code).toEqual('NOT_FOUND');
        }
    });
});
