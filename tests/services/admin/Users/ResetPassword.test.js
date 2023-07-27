const ResetPassword = require('../../../../lib/services/admin/users/ResetPassword');
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
        const service = new ResetPassword(serviceParams);
        const res = await service.run({ data: { oldPassword: '2Smart', newPassword: 'admin', newPasswordConfirm: 'admin' } });

        expect(res).toMatchObject({
            status : 1,
            data   : {}
        });
    });
    test('NEGATIVE: should successfully set password', async () => {
        const service = new ResetPassword(serviceParams);

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
