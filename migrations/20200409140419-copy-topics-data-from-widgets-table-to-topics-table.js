'use strict';

module.exports = {
    up : (queryInterface, Sequelize) => {
        const { sequelize } = queryInterface;

        return sequelize.query('SELECT * FROM widgets', { type: sequelize.QueryTypes.SELECT })
            .then(widgets => {
                const topicsToInsert = widgets.reduce((acc, widget) => {
                    const {
                        id,
                        topic,
                        topicName,
                        dataType,
                        deviceId,
                        nodeId,
                        propertyId,
                        hardwareType,
                        propertyType
                    } = widget;

                    acc.push({
                        widgetId: id,
                        topic,
                        topicName,
                        dataType,
                        deviceId,
                        nodeId,
                        propertyId,
                        hardwareType,
                        propertyType,
                        order : 0
                    });

                    return acc;
                }, []);

                return topicsToInsert.length ? 
                    queryInterface.bulkInsert('topics', topicsToInsert) : // ! sequelize throws error when call bulkInsert with empty array 
                    Promise.resolve();
            });
    },

    down : (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('TRUNCATE topics');
    }
};
