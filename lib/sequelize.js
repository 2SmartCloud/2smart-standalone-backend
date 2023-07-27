const config    = require('../etc/db.js');
const sequelize = require('./sequelizeSingleton.js');

const Screens              = require('./models/Screens');
const Widgets              = require('./models/Widgets');
const Scenarios            = require('./models/Scenarios');
const GlobalSettings       = require('./models/GlobalSettings');
const Users                = require('./models/Users');
const BridgeTypes          = require('./models/BridgeTypes');
const SimpleScenarioTypes  = require('./models/SimpleScenarioTypes');
const NotificationChannels = require('./models/NotificationChannels');
const Topics               = require('./models/Topics');
const ScenarioTemplates    = require('./models/ScenarioTemplates');

Screens.initRelation();
Widgets.initRelation();
Scenarios.initRelation();
GlobalSettings.initRelation();
Users.initRelation();
BridgeTypes.initRelation();
SimpleScenarioTypes.initRelation();
NotificationChannels.initRelation();
Topics.initRelation();
ScenarioTemplates.initRelation();

/* istanbul ignore next */
const { database, host, port } = config[process.env.MODE || 'development'];
const mysqlUrl = `mysql://${host}:${port}/${(database)}`;

module.exports = {
    sequelize,
    mysqlUrl
};
