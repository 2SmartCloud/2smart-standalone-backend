const SetPin = require('../../../../lib/services/admin/users/SetPin');
const UsersInfo = require('../../../../lib/services/admin/users/Info');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { userId: 1, password: true }
};

jest.setTimeout(30000);

describe('Users/Info service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const service = new SetPin(serviceParams);

        await service.run({ data: { pin: '123456', pinConfirm: '123456' } });
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should load user info', async () => {
        const service = new UsersInfo(serviceParams);
        const res = await service.run({});

        expect(res).toMatchObject({
            status : 1,
            data   : {
                pin : true
            }
        });
    });
});
