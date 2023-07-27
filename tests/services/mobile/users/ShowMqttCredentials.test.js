const UsersShowMqttCredentials = require('../../../../lib/services/mobile/users/ShowMqttCredentials');

const serviceArgs                     = { context: {} };
const usersShowMqttCredentialsService = new UsersShowMqttCredentials(serviceArgs);

const TEST_TIMEOUT = 10000;

jest.setTimeout(TEST_TIMEOUT);

describe('mobile: users/ShowMqttCredentials service', () => {
    test('POSITIVE: should successfully return MQTT credentials for the user', async () => {
        const result = await usersShowMqttCredentialsService.run({});

        expect(result.status).toBe(1);
        expect(result.data).toHaveProperty('url');
        expect(result.data).toHaveProperty('username');
        expect(result.data).toHaveProperty('password');
    });
});
