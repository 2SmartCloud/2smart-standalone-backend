#!/usr/bin/env node

const yargs = require('yargs');
const argv = yargs
    .command('reset', 'Reset admin login credentials to default', {
        password: {
            description: 'admin\'s password',
            alias: 'p',
            type: 'string',
        },
        username: {
            description: 'admin\'s username',
            alias: 'u',
            type: 'string',
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const { sequelize }    = require('../lib/sequelize');

const Users = sequelize.model('Users');

async function resetPassword(username = 'admin', password = '2Smart'){
    let user = await Users.findOne();
    await user.update({ username, password });
}
async function main(){
    if (argv._.includes('reset')) {
        await resetPassword(argv.username, argv.password);
        sequelize.close();
        console.log('Done.') ;
    } else {
        console.log('Wrong command. Enter help to see list.') ;
    }
}

main();