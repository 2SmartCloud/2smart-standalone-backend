const UsersUpdate = require('../../../../lib/services/admin/users/Update');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { userId: 1, password: true }
};

jest.setTimeout(30000);

describe('ResetPassword service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully set password', async () => {
        const service = new UsersUpdate(serviceParams);
        const res = await service.run({ data: { oldPassword: '2Smart', newPassword: 'admin', newPasswordConfirm: 'admin' } });

        expect(res).toMatchObject({
            status : 1,
            data   : {}
        });
    });
    test('POSITIVE: should successfully set username', async () => {
        const service = new UsersUpdate(serviceParams);
        const res = await service.run({ data: { username: 'newUsername' } });

        expect(res).toMatchObject({
            status : 1,
            data   : {
                username : 'newUsername'
            }
        });
    });
    test('POSITIVE: should successfully set username and password', async () => {
        const service = new UsersUpdate(serviceParams);
        const res = await service.run({ data: { username: 'newUsername2', oldPassword: 'admin', newPassword: '2Smart', newPasswordConfirm: '2Smart' } });

        expect(res).toMatchObject({
            status : 1,
            data   : {
                username : 'newUsername2'
            }
        });
    });
    test('NEGATIVE: should successfully set password', async () => {
        const service = new UsersUpdate(serviceParams);

        try {
            await service.run({ data: { oldPassword: '2Smart', newPassword: 'admin', newPasswordConfirm: 'another' } });
            throw new Error('Didn\'t send error.');
        } catch (e) {
            expect(e).toMatchObject({
                fields : { 'data/newPasswordConfirm': 'FIELDS_NOT_EQUAL' },
                code   : 'FORMAT_ERROR'
            });
        }
    });
});
