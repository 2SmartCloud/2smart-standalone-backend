const WidgetsCreate = require('../../../../lib/services/admin/widgets/Create');
const WidgetsDelete = require('../../../../lib/services/admin/widgets/Delete');
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
            id           : 1,
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

describe('WidgetsDelete service', () => {
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

    test('POSITIVE: should delete screen', async () => {
        const service = new WidgetsDelete(serviceParams);
        const runParams = {
            id : widgetId
        };

        await service.run(runParams);
    });

    test('NEGATIVE: should throw delete validation error', async () => {
        const service = new WidgetsDelete(serviceParams);

        try {
            await service.run({});
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
            expect(e.fields).toEqual({
                'id' : 'REQUIRED'
            });
        }
    });
});
