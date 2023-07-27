const ScenariosCreate = require('../../../../lib/services/admin/scenarios/Create');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { password: true }
};

jest.setTimeout(30000);

describe('ScenariosCreate service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should create new scenario', async () => {
        const service = new ScenariosCreate(serviceParams);

        const runParams = {
            name     : 'my-scenario-name',
            mode     : 'ADVANCED',
            title    : 'My scenatio title',
            status   : 'INACTIVE',
            script   : 'echo "hello";',
            language : 'JS'
        };

        const res = await service.run({ data: runParams });

        expect(res).toMatchObject({
            status : 1,
            data   : {
                name     : 'my-scenario-name',
                mode     : 'ADVANCED',
                title    : 'My scenatio title',
                status   : 'INACTIVE',
                script   : 'echo "hello";',
                language : 'JS'
            }
        });
    });

    test('NEGATIVE: should throw validation error(field: name)', async () => {
        const service = new ScenariosCreate(serviceParams);

        try {
            await service.run({ data : { // check capital letter
                name   : 'A',
                title  : 'title',
                script : ''
            } });
            throw new Error('Service didn\'t send the validation error.');
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
        }

        try {
            await service.run({ data : { // check capital letter
                name   : 'A',
                title  : 'title',
                script : ''
            } });
            throw new Error('Service didn\'t send the validation error.');
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
        }

        try {
            await service.run({ data : { // check capital letter
                name   : 'A',
                title  : 'title',
                script : ''
            } });
            throw new Error('Service didn\'t send the validation error.');
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
        }

        try {
            await service.run({ data : { // check capital letter
                name   : '_',
                title  : 'title',
                script : ''
            } });
            throw new Error('Service didn\'t send the validation error.');
        } catch (e) {
            expect(e.code).toEqual('FORMAT_ERROR');
        }
    });
});
