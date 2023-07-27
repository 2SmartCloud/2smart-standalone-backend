const SessionsCreate      = require('../../../../lib/services/mobile/sessions/Create');
const ValidationException = require('../../../../lib/utils/errors/ValidationException');
const TestFactory         = require('../../../utils');

const factory               = new TestFactory();
const serviceArgs           = { context: {} };
const sessionsCreateService = new SessionsCreate(serviceArgs);
const user = {
    id       : 1,
    username : 'admin',
    password : '2Smart'
};

const TEST_TIMEOUT = 10000;

jest.setTimeout(TEST_TIMEOUT);

describe('mobile: sessions/Create service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully create session', async () => {
        const result = await sessionsCreateService.run({
            username : user.username,
            password : user.password
        });

        expect(result.status).toBe(1);
        expect(result.data).toHaveProperty('jwt');
        expect(typeof result.data.jwt).toBe('string');
    });

    test('NEGATIVE: should throw error on wrong username', async () => {
        await expect(sessionsCreateService
            .run({
                username : 'wrong-username',
                password : user.password
            }))
            .rejects
            .toThrow(ValidationException);
    });

    test('NEGATIVE: should throw error on wrong password', async () => {
        await expect(sessionsCreateService
            .run({
                username : user.username,
                password : 'wrong-password'
            }))
            .rejects
            .toThrow(ValidationException);
    });
});
