process.env.MODE = 'test'; // override env mode to use test database
/* eslint-disable no-sync */
// eslint-disable-next-line func-names

async function CreateTestDb() {
    console.log('Creating test database');
    const Sequelize = require('sequelize');
    const { database, username, password, dialect, host, port } = require('../etc/db.js')[process.env.MODE || 'development'];
    const sequelize = new Sequelize({
        username       : 'root',
        password       : process.env.DB_ROOT_PASSWORD,
        host,
        port,
        dialect,
        logging        : false,
        dialectOptions : {
            'supportBigNumbers' : true,
            'bigNumberStrings'  : true
        }
    });
    const { escape } = require('sequelize/lib/sql-string');// because we need a special quotes
    // eslint-disable-next-line func-style
    const esc = (val) => {
        return escape(val, null, sequelize.options.dialect, true).slice(1, -1);
    };

    await sequelize.authenticate();
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${esc(database)}\``,
        { raw: true, logging: console.log }
    );
    await sequelize.query(`GRANT ALL PRIVILEGES ON \`${esc(database)}\`.* TO \`${esc(username)}\`@'%' IDENTIFIED BY '${esc(password)}'`,
        { raw: true, logging: console.log }
    );
}
async function CheckAndCreateTestDb() {
    const sequelize = global.__SEQUELIZE__;
    // eslint-disable-next-line more/no-then

    try {
        await sequelize.authenticate();
        // okey, we have the DB
    } catch (e) {
        // eslint-disable-next-line more/no-duplicated-chains
        if (e.parent && (e.parent.code === 'ER_DBACCESS_DENIED_ERROR' || e.parent.code === 'ER_ACCESS_DENIED_ERROR')) {
            await CreateTestDb();
        } else throw e;
    }
}
async function runMigraion() {
    console.log('Rum migration');
    const path = require('path');
    const { spawn } = require('child_process');
    const Promise = require('bluebird');

    return new Promise((resolve, reject) => {
        console.log(path.resolve('..'));
        const proc = spawn('npm', [ 'run', 'migration-test' ], { cwd: path.resolve('.') });

        proc.stdout.on('data', data => console.log(data.toString()));
        proc.stderr.on('data', data => console.log(data.toString()));

        proc.on('error', (err) => {
            reject(err);
            // eslint-disable-next-line no-param-reassign
            resolve = reject = () => {};
        });
        proc.on('exit', (code) => {
            if (code === null || code === 0) {
                resolve();
            } else {
                reject(new Error(`Migration ended with code ${code}`));
            }
            // eslint-disable-next-line no-param-reassign
            resolve = reject = () => {};
        });
    });
}

// eslint-disable-next-line func-names
module.exports = async function () {
    const { sequelize } = require('./../lib/sequelize.js');

    global.__SEQUELIZE__ = sequelize;
    await CheckAndCreateTestDb();
    await runMigraion();
};
