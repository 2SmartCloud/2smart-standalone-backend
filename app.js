const path     = require('path');
const bluebird = require('bluebird');

global.Promise = bluebird;

const express      = require('express');
const middlewares  = require('./lib/middlewares');
const adminRouter  = require('./lib/routers/admin');
const mobileRouter = require('./lib/routers/mobile');

require('./lib/registerValidationRules');

const APP_PORT = process.env.APP_PORT || 8000;

const { extensions } = require('./etc/config')[process.env.MODE || 'development'];

// Init app
const app = express();

app.use(middlewares.json);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.multipart);
app.use('/api/v1', adminRouter);
app.use('/api/mobile/v1', mobileRouter);
app.use('/api/static', express.static(path.join(__dirname, 'static')));
app.use('/api/static/extension/icons', express.static(path.join(extensions.installPath, extensions.iconsDirName)));

app.listen(APP_PORT, () => {
    console.log(JSON.stringify({ level: 'info', message: `APP STARTING AT PORT ${APP_PORT}` }));
});

module.exports = app;
