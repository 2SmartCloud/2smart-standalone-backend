const jwt = require('jsonwebtoken');

const SessionsCreate = require('../../../../lib/services/admin/sessions/Create');
const SetPin = require('../../../../lib/services/admin/users/SetPin');
const TestFactory = require('../../../utils');

const factory = new TestFactory();

const serviceParams = {
    context : { userId: 1, password: true }
};

jest.setTimeout(30000);

let accessToken;
const pin = 123123;
const password = '2Smart';
const username = 'admin';

describe('Sessions/Create service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const service = new SetPin(serviceParams);

        await service.run({ data: { pin, pinConfirm: pin } });
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully create session with pin', async () => {
        const service = new SessionsCreate(serviceParams);
        const res = await service.run({ data: { pin } });

        accessToken = res.data.accessToken;
        expect(jwt.decode(accessToken)).toMatchObject({
            pin : true
        });
    });

    test('POSITIVE: should successfully recreate session with pin', async () => {
        const service = new SessionsCreate(serviceParams);
        const res = await service.run({ data: { token: accessToken } });

        expect(jwt.decode(res.data.accessToken)).toMatchObject({
            pin : true
        });
    });

    test('POSITIVE: should successfully create session with password', async () => {
        const service = new SessionsCreate(serviceParams);
        const res = await service.run({ data: { password, username } });

        accessToken = res.data.accessToken;
        expect(jwt.decode(res.data.accessToken)).toMatchObject({
            password : true
        });
    });

    test('POSITIVE: should successfully recreate session with password', async () => {
        const service = new SessionsCreate(serviceParams);
        const res = await service.run({ data: { token: accessToken } });

        expect(jwt.decode(res.data.accessToken)).toMatchObject({
            password : true
        });
    });
});
