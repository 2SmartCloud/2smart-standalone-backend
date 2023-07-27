const WidgetsCreate = require('../../../../lib/services/admin/widgets/Create');
const WidgetsUpdate = require('../../../../lib/services/admin/widgets/Update');
const ScreensList = require('../../../../lib/services/admin/screens/List');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

let screenId;

let widgetId;

const serviceParams = {
    context : {}
};
const validParams = {
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
    type    : 'string'
};

jest.setTimeout(30000);

describe('WidgetsUpdate service', () => {
    beforeAll(async () => {
        await factory.cleanup();

        const screenService = new ScreensList(serviceParams);
        const screen = await screenService.run({});

        screenId = screen.data[0].id;

        const widgetService = new WidgetsCreate(serviceParams);
        const widget = await widgetService.run({ data: { ...validParams, screen: screenId } });

        widgetId = widget.data.id;
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should update widget', async () => {
        const service = new WidgetsUpdate(serviceParams);
        const res = await service.run({ id: widgetId, data: { ...validParams, screen: screenId } });

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

    test('NEGATIVE: should throw update widget validation error', async () => {
        const service = new WidgetsUpdate(serviceParams);
        const runParams = {
            topics : [
                {
                    id           : 1,
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
            type    : 'string'
        };

        try {
            await service.run({ id: widgetId, data: runParams });
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
            expect(e.fields).toEqual({
                'data/topics/0/hardwareType' : 'NOT_ALLOWED_VALUE'
            });
        }
    });
});
