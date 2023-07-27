const ScenariosDelete = require('../../../../lib/services/admin/scenarios/Delete');
const ScenariosCreate = require('../../../../lib/services/admin/scenarios/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};


jest.setTimeout(30000);

describe('ScenariosDelete service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should delete scenario', async () => {
        const serviceCreate = new ScenariosCreate(serviceParams);
        const serviceDelete = new ScenariosDelete(serviceParams);

        try {
            const res = await serviceCreate.run({ data : {
                name   : 'name',
                title  : 'title',
                script : ''
            } });

            await serviceDelete.run({ id: res.data.id });
        } catch (e) {
            throw e;
        }
    });
});
