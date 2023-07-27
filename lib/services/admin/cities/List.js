const ServiceBase = require('../BaseService');

const {
    getAllCities,
    searchCitiesByName,
    searchCityByCoordinates
} = require('../utils');

const DEFAULT_LIMIT = 20;

class CitiesList extends ServiceBase {
    static validationRules = {
        search : [ 'string' ],
        latlng : [ 'string' ],
        limit  : [ 'positive_integer', { 'min_number': 1, 'max_number': 20 } ]
    };

    async execute(data) {
        await this.middleCheckPermissions();

        const res = this.getList(data);

        return {
            status : 1,
            data   : res
        };
    }

    getList(options) {
        const { search, latlng, limit } = options;
        const listLimit = limit || DEFAULT_LIMIT;

        let citiesList;

        if (search) {
            citiesList = searchCitiesByName(search, listLimit);

            return { data: citiesList };
        }

        if (latlng) {
            citiesList = searchCityByCoordinates(latlng, listLimit);

            return { data: citiesList };
        }

        citiesList = getAllCities(listLimit);

        return { data: citiesList };
    }
}

module.exports = CitiesList;
