const chista = require('../../chista');

const ScreensList = require('../../services/mobile/screens/List');
const ScreensShow = require('../../services/mobile/screens/Show');

module.exports = {
    list : chista.makeServiceRunner(ScreensList),
    show : chista.makeServiceRunner(ScreensShow, req => ({ id: req.params.id }))
};
