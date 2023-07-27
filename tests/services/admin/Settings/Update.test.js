const UpdateSettings = require('../../../../lib/services/admin/settings/Update');
const SetPin = require('../../../../lib/services/admin/users/SetPin');
const TestFactory = require('../../../utils');
const { sequelize } = require('../../../../lib/sequelize');

const Users = sequelize.model('Users');
const factory = new TestFactory();

const serviceParams = {
    context : { userId: 1, password: true }
};

jest.setTimeout(30000);

describe('Settings/Update service', () => {
    beforeAll(async () => {
        await factory.cleanup();
        const service = new SetPin(serviceParams);

        await service.run({ data: { pin: '123456', pinConfirm: '123456' } });
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should successfully update setting', async () => {
        const updateSettingsService = new UpdateSettings(serviceParams);
        const res = await updateSettingsService.run({
            data : { secure_mode_enabled: false }
        });

        expect(res).toMatchObject({
            status : 1,
            data   : {
                secure_mode_enabled : false
            }
        });
    });

    test('POSITIVE: should throw an error in when we set secure_mode_enabled=true if user has no pin.', async () => {
        const user = await Users.findByPk(1);

        await user.update({ pinHash: null });
        const updateSettingsService = new UpdateSettings(serviceParams);

        try {
            await updateSettingsService.run({
                data : { secure_mode_enabled: true }
            });

            throw new Error('Didn\'t send error.');
        } catch (e) {
            expect(e).toMatchObject({
                'code'   : 'USER_HAS_NO_PIN',
                'fields' : {}
            });
        }
    });
});
