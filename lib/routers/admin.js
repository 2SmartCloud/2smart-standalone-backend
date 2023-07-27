const express     = require('express');
const controllers = require('../controllers/admin');

const router = express.Router();
/*
* checkSession checks session only if keys have been passed to server.
* I.e. it is nessesary to check the session object.(or context in context of chista lib.)
* */
const checkSession = controllers.sessions.check;

router.use(checkSession);

router.get('/screens', controllers.screens.list);
router.post('/screens', controllers.screens.create);            // parent mode
router.get('/screens/:id', controllers.screens.show);           // parent mode
router.delete('/screens/:id', controllers.screens.delete);      // parent mode
router.put('/screens/:id', controllers.screens.update);         // parent mode

router.post('/widgets', controllers.widgets.create);            // parent mode
router.delete('/widgets/:id', controllers.widgets.delete);      // parent mode
router.put('/widgets/:id', controllers.widgets.update);         // parent mode

router.get('/scenarios', controllers.scenarios.list);
router.post('/scenarios', controllers.scenarios.create);
router.get('/scenarios/:id', controllers.scenarios.show);
router.delete('/scenarios/:id', controllers.scenarios.delete);
router.put('/scenarios/:id', controllers.scenarios.update);
router.get('/scenariosUniqueName', controllers.scenarios.getUniqueName);

router.post('/sessions', controllers.sessions.create);

router.get('/settings', controllers.settings.getAll);
router.post('/settings', controllers.settings.update); // admin mode

router.post('/users/pin', controllers.users.setPin);                  // admin mode
router.post('/users/resetPassword', controllers.users.resetPassword); // admin mode
router.get('/users/info', controllers.users.info);                    // admin mode
router.put('/users/me', controllers.users.update);                    // admin mode

router.get('/bridgeTypes', controllers.bridge_types.list);
router.get('/simpleScenarioTypes', controllers.simple_scenario_types.list);
router.get('/notificationChannels', controllers.notification_channels.list);
router.get('/scenarioTemplates', controllers.scenario_templates.list);

router.get('/logs', controllers.logs.list);

router.get('/cities', controllers.cities.list);

// extensions' endpoints
router.get('/extensions', controllers.extensions.list);
router.get('/extensions/:name', controllers.extensions.show);

router.get('/changelogs', controllers.changelogs.list);

module.exports = router;
