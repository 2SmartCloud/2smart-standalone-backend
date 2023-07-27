const { Router } = require('express');

const controllers = require('../controllers/mobile');

const router       = Router();
const checkSession = controllers.sessions.check;

router.post('/sessions', controllers.sessions.create);
router.post('/sessions/screens', checkSession, controllers.sessions.createForScreen);

router.get('/screens', checkSession, controllers.screens.list);
router.get('/screens/:id', checkSession, controllers.screens.show);

router.get('/users/mqtt', checkSession, controllers.users.showMqttCredentials);

module.exports = router;
