const SessionsCheck           = require('../../../../lib/services/mobile/sessions/Check');
const SessionsCreate          = require('../../../../lib/services/mobile/sessions/Create');
const SessionsCreateForScreen = require('../../../../lib/services/mobile/sessions/CreateForScreen');
const ForbiddenException      = require('../../../../lib/utils/errors/ForbiddenException');
const TestFactory             = require('../../../utils');
const { fillUsers }           = require('../../../utils/fillDatabase');
const [ userWithPin ]         = require('../../../fixtures/users');

const factory              = new TestFactory();
const serviceArgs          = { context: {} };
const sessionsCheckService = new SessionsCheck(serviceArgs);
let validToken             = '';
let validScreensToken      = '';
const user = {
    id       : 1,
    username : 'admin',
    password : '2Smart'
};

const TEST_TIMEOUT = 10000;

jest.setTimeout(TEST_TIMEOUT);

describe('mobile: sessions/Check service', () => {
    beforeAll(async () => {
        await factory.cleanup();

        await fillUsers();

        const { data: { jwt } } = await (new SessionsCreate(serviceArgs).run({
            username : user.username,
            password : user.password
        }));

        const { data: { jwt: screensJwt } } = await (new SessionsCreateForScreen({
            context : {
                userId : userWithPin.id
            }
        }).run({
            pin : '111111'
        }));

        validToken = jwt;
        validScreensToken = screensJwt;
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully validate token', async () => {
        const result = await sessionsCheckService.run({
            token : validToken
        });

        expect(result.status).toBe(1);
        expect(result.data).toHaveProperty('userId');
        expect(result.data.userId).toEqual(user.id);
    });

    test('POSITIVE: should successfully validate screens token', async () => {
        const result = await sessionsCheckService.run({
            token : validScreensToken
        });

        expect(result.status).toBe(1);
        expect(result.data).toHaveProperty('pin');
        expect(result.data.pin).toEqual(true);
    });

    test('NEGATIVE: should throw error on wrong token', async () => {
        await expect(sessionsCheckService
            .run({
                token : validToken.slice(1)
            }))
            .rejects
            .toThrow(ForbiddenException);
    });

    test('NEGATIVE: should throw error on wrong screens token', async () => {
        await expect(sessionsCheckService
            .run({
                token : validScreensToken.slice(1)
            }))
            .rejects
            .toThrow(ForbiddenException);
    });
});
