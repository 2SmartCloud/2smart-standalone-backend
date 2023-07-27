const ScenariosShow = require('../../../../lib/services/admin/scenarios/Show');
const ScenariosCreate = require('../../../../lib/services/admin/scenarios/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

jest.setTimeout(30000);

let scenarioId;

describe('ScenariosShow service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const serviceCreate = new ScenariosCreate(serviceParams);
        const res = await serviceCreate.run({ data : {
            name   : 'test-show',
            title  : 'test_show title',
            script : ''
        } });

        scenarioId = res.data.id;
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should show scenario', async () => {
        const serviceShow = new ScenariosShow(serviceParams);

        const res = await serviceShow.run({ id: scenarioId });

        expect(res).toMatchObject({
            data : {
                id     : scenarioId,
                name   : 'test-show',
                title  : 'test_show title',
                script : ''
            }
        });
    });
});
