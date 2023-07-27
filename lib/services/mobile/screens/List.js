const Base                 = require('../Base');
const { dumpListedScreen } = require('../dumps');
const { sequelize }        = require('../../../sequelize');

const Screens = sequelize.model('Screens');

module.exports = class ScreensList extends Base {
    async execute() {
        const screens = await Screens.findAll({
            attributes : { exclude: [ 'layout' ] },
            order      : [ [ 'position', 'ASC' ] ]
        });

        // create default screen
        if (!screens.length) {
            const screen = await Screens.create({
                name     : 'My screen 1',
                position : 1
            });

            screens.push(screen);
        }

        return {
            status : 1,
            data   : {
                screens : await Promise.all(screens.map(dumpListedScreen))
            }
        };
    }
};
