const _ = require('underscore');

const { sequelize } = require('../../sequelize');

const Screens        = sequelize.model('Screens');
const GlobalSettings = sequelize.model('GlobalSettings');

function dumpTopic(topic) {
    return typeof topic === 'string' ? topic : topic.topic;
}

function dumpWidget(widget) {
    return {
        id     : `${widget.id}`,
        topics : widget.topics ? widget.topics.map(dumpTopic) : [],
        ... _.pick(widget, [ 'type', 'name', 'advanced' ])
    };
}

async function dumpScreen(screen) {
    // sort lg(desktop) layout by x and y coordinates firstly(on mobile the order of widgets must be
    // same as on a desktop), then sort widgets by layout and then append rest of widgets, this
    // steps are required to display widgets on mobile from layout firstly and with the correct
    // order, the order of rest widgets doesn't matter
    const layoutSortedByCoordinates = screen.layout.lg ?
        Screens.sortLayoutByCoordinates(screen.layout.lg) :
        [];
    const widgetsFromLayout = layoutSortedByCoordinates.reduce((acc, { i }) => {
        const widget = screen.widgets.find(screenWidget => screenWidget.id === +i);

        return widget ? [ ...acc, widget ] : acc;
    }, []);
    const restWidgets = screen.widgets.filter(widget => !widgetsFromLayout.includes(widget));
    const allWidgets = [ ...widgetsFromLayout, ...restWidgets ];
    const isSecureModeEnabled = await GlobalSettings.get('secure_mode_enabled');

    return {
        id            : screen.id,
        title         : screen.name,
        widgets       : allWidgets.map(dumpWidget),
        // temporary solution: return false if secure mode is disabled and screen.parentControl value
        // if not, this solution is a hot fix to prevent sending two request from client: for getting
        // global settings and for getting the screen info. When we will need to set pins on screens from
        // mobile app this solution should be replaced with 2 requests as mentioned above
        parentControl : isSecureModeEnabled && screen.parentControl
    };
}

async function dumpListedScreen(screen) {
    const isSecureModeEnabled = await GlobalSettings.get('secure_mode_enabled');

    return {
        id            : screen.id,
        title         : screen.name,
        // temporary solution: return false if secure mode is disabled and screen.parentControl value
        // if not, this solution is a hot fix to prevent sending two request from client: for getting
        // global settings and for getting the screen info. When we will need to set pins on screens from
        // mobile app this solution should be replaced with 2 requests as mentioned above
        parentControl : isSecureModeEnabled && screen.parentControl
    };
}

module.exports = {
    dumpTopic,
    dumpWidget,
    dumpScreen,
    dumpListedScreen
};
