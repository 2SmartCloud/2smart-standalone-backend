const ScenariosList = require('../../../../lib/services/admin/scenarios/List');
const ScenariosCreate = require('../../../../lib/services/admin/scenarios/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

jest.setTimeout(30000);

describe('ScenariosList service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should show empty list of scenarios', async () => {
        const service = new ScenariosList(serviceParams);
        const res = await service.run({ data: {} });

        expect(res.data.length).toBe(0);
    });
    test('POSITIVE: should show scenarios', async () => {
        const serviceList = new ScenariosList(serviceParams);
        const serviceCreate = new ScenariosCreate(serviceParams);

        await serviceCreate.run({ data : {
            name   : 'name',
            title  : 'title',
            script : ''
        } });
        const res = await serviceList.run({ data: {} });

        expect(res.data.length).toBe(1);
        expect(res.data[0]).toMatchObject({
            name  : 'name',
            title : 'title'
        });
    });
});
