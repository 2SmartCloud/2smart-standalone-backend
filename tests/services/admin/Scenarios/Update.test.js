const ScenariosUpdate = require('../../../../lib/services/admin/scenarios/Update');
const ScenariosCreate = require('../../../../lib/services/admin/scenarios/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

let scenarioId;

jest.setTimeout(30000);

describe('ScenariosUpdate service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const serviceCreate = new ScenariosCreate(serviceParams);
        const res = await serviceCreate.run({ data : {
            name   : 'test-update',
            title  : 'test_update title',
            script : ''
        } });

        scenarioId = res.data.id;
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should update scenario', async () => {
        const service = new ScenariosUpdate(serviceParams);
        const res = await service.run({
            id   : scenarioId,
            data : {
                title  : 'test_update new_title',
                script : 'script'
            }
        });

        expect(res).toMatchObject({
            data : {
                id     : scenarioId,
                name   : 'test-update',
                title  : 'test_update new_title',
                script : 'script'
            }
        });
    });

    test('NEGATIVE: should throw on update scenario', async () => {
        const service = new ScenariosUpdate(serviceParams);

        try {
            await service.run({
                id   : scenarioId,
                data : {
                    status : 'WRONG_VALUE_1234567890'
                }
            });
            throw new Error('Service didn\'t send the validation error.');
        } catch (e) {
            expect(e.code).toBe('FORMAT_ERROR');
        }
    });
});
