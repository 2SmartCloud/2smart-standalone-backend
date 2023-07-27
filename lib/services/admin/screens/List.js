const ServiceBase    = require('../BaseService');
const { dumpScreen } = require('../utils.js');
const { sequelize }    = require('../../../sequelize');

// const Widgets = sequelize.model('Widgets');
const Screens = sequelize.model('Screens');

class ScreensList extends ServiceBase {
    async execute() {
        const screens = await Screens.findAll({
            // include : [ {
            //    model : Widgets,
            //    as    : 'widgets'
            // } ],
            // attributes : { exclude: [ 'layout' ] },
            order : [ [ 'createdAt', 'ASC' ] ]
        });

        // Create default screen
        if (!screens.length) {
            const screen = await Screens.create({
                name     : 'My screen 1',
                position : 1
            });

            delete screen.layout;
            screens.push(screen);
        }

        const res = screens.map(dumpScreen);

        return {
            status : 1,
            data   : res
        };
    }
}

module.exports = ScreensList;
