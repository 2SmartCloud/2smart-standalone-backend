const config = require('./config');

const MODE = process.env.MODE || 'development';

module.exports = config[MODE];
