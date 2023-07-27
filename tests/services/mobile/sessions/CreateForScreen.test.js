const SessionsCreateForScreen = require('../../../../lib/services/mobile/sessions/CreateForScreen');
const ValidationException     = require('../../../../lib/utils/errors/ValidationException');
const TestFactory             = require('../../../utils');
const { fillUsers }           = require('../../../utils/fillDatabase');
const [ user ]                = require('../../../fixtures/users');

const factory                        = new TestFactory();
const serviceArgs                    = { context: { userId: user.id } };
const sessionsCreateForScreenService = new SessionsCreateForScreen(serviceArgs);

const TEST_TIMEOUT = 10000;

jest.setTimeout(TEST_TIMEOUT);

describe('mobile: sessions/CreateForScreen service', () => {
    beforeAll(async () => {
        await factory.cleanup();

        await fillUsers();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully create session for screens', async () => {
        const validPin = '111111';
        const result = await sessionsCreateForScreenService.run({
            pin : validPin
        });

        expect(result.status).toBe(1);
        expect(result.data).toHaveProperty('jwt');
        expect(typeof result.data.jwt).toBe('string');
    });

    test('NEGATIVE: should throw error on wrong pin', async () => {
        const invalidPin = '000000';

        await expect(sessionsCreateForScreenService
            .run({
                pin : invalidPin
            }))
            .rejects
            .toThrow(ValidationException);
    });
});
