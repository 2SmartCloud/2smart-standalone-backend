const _      = require('underscore');
const cities = require('all-the-cities');

function dumpScreen(screen) {
    return {
        id      : `${screen.id}`,
        widgets : screen.widgets ? screen.widgets.map(dumpWidget) : [],
        ... _.pick(screen, [ 'name', 'position', 'count', 'layout', 'parentControl' ])
    };
    /* return {
        id       : `${screen.id}`,
        name     : screen.name,
        position : screen.position,
        count    : screen.id,
        layout   : screen.layout,
        widgets  : screen.widgets ? screen.widgets.map(dumpWidget) : []
    }; */
}

function dumpWidget(widget) {
    return {
        id     : `${widget.id}`,
        topics : widget.topics ? widget.topics.map(dumpTopic) : [],
        orders : widget.topics ? dumpOrder(widget.topics) : {},
        ... _.pick(widget, [
            'type', 'name', 'bgColor', 'advanced'
        ])
    };
    /* return {
        id           : `${widget.id}`,
        type         : widget.type,
        name         : widget.name,
        bgColor      : widget.bgColor,
        advanced     : widget.advanced,
        topics       : widget.topics
    };*/
}

function dumpTopic(topic) {
    return typeof topic === 'string' ? topic : topic.topic;
}

function dumpOrder(topics) {
    const orders = {};

    for (const topic of topics) {
        orders[topic.topic] = topic.order;
    }

    return orders;
}

function dumpScenario(scenario) {
    return {
        id     : `${scenario.id}`,
        typeId : (scenario.typeId) ? `${scenario.typeId}` : null,
        ... _.pick(scenario, [
            'name', 'mode', 'title',
            'status', 'script', 'language', 'createdAt',
            'updatedAt', 'params', 'type'
        ])
    };
    /* return {
        id        : `${scenario.id}`,
        name      : scenario.name,
        mode      : scenario.mode,
        title     : scenario.title,
        status    : scenario.status,
        script    : scenario.script,
        language  : scenario.language,
        createdAt : scenario.createdAt,
        updatedAt : scenario.updatedAt
    }; */
}

function dumpBridgeType(bridgeType) {
    return {
        ... _.pick(bridgeType, [ 'title', 'type', 'icon', 'configuration' ])
    };
}


function dumpScenarioType(scenarioType) {
    return {
        id : `${scenarioType.id}`,
        ... _.pick(scenarioType, [ 'title', 'description', 'configuration', 'language', 'icon' ])
    };
}

function dumpNotificationChannelType(notificationChannelType) {
    return {
        ... _.pick(notificationChannelType, [ 'name', 'type', 'configuration', 'icon' ])
    };
}

function dumpExtension(extension) {
    return {
        name        : extension.name,
        version     : extension.version,
        description : extension.description,
        link        : extension.link,
        type        : extension.type,
        language    : extension.language
    };
}

function dumpScenarioTemplate(scenarioTemplate) {
    return _.pick(scenarioTemplate, [ 'name', 'code' ]);
}

function mapCities(array, limit) {
    const citiesToMap = array.map(city => {
        const latLng = `${city.loc.coordinates[1]},${city.loc.coordinates[0]}`;

        return {
            id      : city.cityId,
            label   : city.name,
            value   : latLng,
            country : city.country
        };
    });

    return citiesToMap.filter((city, index) => index < limit);
}

function getAllCities(limit) {
    const citiesToMap = mapCities(cities, limit);

    return citiesToMap;
}

function searchCitiesByName(cityName, limit) {
    const cityToFind = RegExp(cityName.toLowerCase(), 'g');
    const citiesFilter = cities.filter(city => cityToFind.test(city.name.toLowerCase()));
    const citiesToMap = mapCities(citiesFilter, limit);

    return citiesToMap;
}

function searchCityByCoordinates(coordinates, limit) {
    const latlng = coordinates.split(',');
    const citiesFilter = cities.filter(city => city.loc.coordinates.includes(+latlng[1] && +latlng[0]));
    const citiesToMap = mapCities(citiesFilter, limit);

    return citiesToMap;
}

module.exports = {
    dumpScreen,
    dumpWidget,
    dumpScenario,
    dumpBridgeType,
    dumpScenarioType,
    dumpNotificationChannelType,
    dumpTopic,
    getAllCities,
    searchCitiesByName,
    searchCityByCoordinates,
    dumpExtension,
    dumpScenarioTemplate
};
