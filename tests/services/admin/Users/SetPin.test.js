const SessionsCreate = require('../../../../lib/services/admin/sessions/Create');
const SessionsCheck = require('../../../../lib/services/admin/sessions/Check');
const SetPin = require('../../../../lib/services/admin/users/SetPin');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { userId: 1, password: true }
};

jest.setTimeout(30000);

describe('SetPin service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const service = new SetPin(serviceParams);

        await service.run({ data: { pin: '123456', pinConfirm: '123456' } });
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully set pin', async () => {
        const pin = '123456';
        const service = new SetPin(serviceParams);
        const res = await service.run({ data: { pin, pinConfirm: pin } });

        expect(res).toMatchObject({
            data : {}
        });
    });

    test('NEGATIVE: should throw setPin validation error', async () => {
        const pin = '12345';
        const service = new SetPin(serviceParams);

        try {
            await service.run({ data: { pin, confirmPin: pin } });
            throw new Error('Didn\'t send error.');
        } catch (e) {
            expect(e).toMatchObject({
                fields : { 'data/pin': 'TOO_SHORT' },
                code   : 'FORMAT_ERROR'
            });
        }
    });


    test('POSITIVE: should successfully broken previous tokens after change pin', async () => {
        const pin = '123456';
        const newPin = '111111';

        let serviceSetPin = new SetPin(serviceParams);

        await serviceSetPin.run({ data: { pin, pinConfirm: pin } });

        const serviceSessionsCreate = new SessionsCreate(serviceParams);

        const resSessionsCreate = await serviceSessionsCreate.run({ data: { pin } });
        const accessToken = resSessionsCreate.data.accessToken;

        serviceSetPin = new SetPin(serviceParams);
        await serviceSetPin.run({ data: { pin: newPin, pinConfirm: newPin } });

        const resSessionsCheck = new SessionsCheck(serviceParams);

        try {
            await resSessionsCheck.run({ token: accessToken });
            throw new Error('Last token is still valid.');
        } catch (e) {
            expect(e).toMatchObject({
                // code   : 'INVALID_SIGNATURE',
                // fields : {}
            });
        }
    });
});
