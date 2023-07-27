const jwt = require('jsonwebtoken');

const SessionsCreate = require('../../../lib/services/admin/sessions/Create');
const TestFactory = require('./../../utils');

const { exec } = require('child_process');

const factory = new TestFactory();

const serviceParams = {
    context : {}
};

jest.setTimeout(30000);
const password = 'newpassword';
const username = 'newusername';

describe('ScreensCreate service', () => {
    beforeAll(async () => {
        await factory.cleanup();
    });

    afterAll(async () => {
        await factory.cleanup();
        await factory.end();
    });

    test('POSITIVE: should change admin username and password via command line', async () => {
        await new Promise(function(resolve, reject){
            exec(`npm run cli reset -- --username=${username} --password=${password}`, { cwd:'.'}, function(err, stdout, stderr){
                if(err) return reject(err) ;
                console.log(stdout) ;
                console.log(stderr) ;
                return resolve(stdout, stderr) ;
            })
        });
        const service = new SessionsCreate(serviceParams);
        const res = await service.run({ data: { password, username } });

        expect(jwt.decode(res.data.accessToken)).toMatchObject({
            password : true
        });
    });
});

