const ScenariosGetUniqueName = require('../../../../lib/services/admin/scenarios/GetUniqueName');
const ScenariosCreate = require('../../../../lib/services/admin/scenarios/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

jest.setTimeout(30000);

const SCENARIO_NAME      = 'pro-scenario-1';
const NEXT_SCENARIO_NAME = 'pro-scenario-2';
const ADVANCED_MODE      = 'ADVANCED';

describe('Scenarios GetUniqueName service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const serviceCreate = new ScenariosCreate(serviceParams);
        await serviceCreate.run({ data : {
            name   : SCENARIO_NAME,
            title  : 'pro-scenario',
            mode   : ADVANCED_MODE,
            script : ''
        } });
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should return new unique name for pro scenario', async () => {
        const serviceShow = new ScenariosGetUniqueName(serviceParams);

        const res = await serviceShow.run({ type: null, mode: ADVANCED_MODE });

        expect(res).toMatchObject({
            data : {
                name : NEXT_SCENARIO_NAME
            }
        });
    });
});
