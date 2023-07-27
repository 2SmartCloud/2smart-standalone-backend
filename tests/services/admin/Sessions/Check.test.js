const SessionsCheck = require('../../../../lib/services/admin/sessions/Check');
const SessionsCreate = require('../../../../lib/services/admin/sessions/Create');
const SetPin = require('../../../../lib/services/admin/users/SetPin');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { userId: 1, password: true }
};

jest.setTimeout(30000);
let accessTokenPin;

let accessTokenPassword;

const pin = 123123;
const password = '2Smart';
const username = 'admin';

describe('Sessions/Check service', () => {
    console.error = console.log;
    beforeAll(async () => {
        await factory.cleanup();
        const serviceSetPin = new SetPin(serviceParams);

        await serviceSetPin.run({ data: { pin, pinConfirm: pin } });
        const serviceSessionsCreatePin = new SessionsCreate(serviceParams);
        const resPin = await serviceSessionsCreatePin.run({ data: { pin } });
        const serviceSessionsCreatePassword = new SessionsCreate(serviceParams);
        const resPassword = await serviceSessionsCreatePassword.run({ data: { password, username } });

        accessTokenPin = resPin.data.accessToken;
        accessTokenPassword = resPassword.data.accessToken;
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully check pin session', async () => {
        const service = new SessionsCheck(serviceParams);
        const res = await service.run({ token: accessTokenPin });

        expect(res).toMatchObject({ pin: true });
    });

    test('POSITIVE: should successfully check password session', async () => {
        const service = new SessionsCheck(serviceParams);
        const res = await service.run({ token: accessTokenPassword });

        expect(res).toMatchObject({ password: true });
    });

    test('NEGATIVE: should successfully check session', async () => {
        const service = new SessionsCheck(serviceParams);
        const res = await service.run({ token: 'WRONG_ACCESS_TOKEN' });

        expect(Object.keys(res).length).toEqual(0);
    });
});
