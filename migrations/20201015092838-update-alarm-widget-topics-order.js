'use strict';

module.exports = {
  up: (queryInterface) => {
    const { sequelize } = queryInterface;

    return sequelize.query(
      'SELECT t.order, t.id FROM widgets w JOIN topics t ON w.id = t.widgetId where w.type="alarm"',
      { type : sequelize.QueryTypes.SELECT }
    ).then(async arr => {
        Promise.all(
          arr.map(record => {
            const orderMap = {
                0: 2,
                1: 0,
                2: 1
            };

            return queryInterface.bulkUpdate('topics', {
                order : orderMap[record.order]
            }, { id: record.id }, {});
          })
        );

        return Promise.resolve();
    });
  },

  down: (queryInterface) => {
      const { sequelize } = queryInterface;

      return sequelize.query(
        'SELECT t.order, t.id FROM widgets w JOIN topics t ON w.id = t.widgetId where w.type="alarm"',
        { type : sequelize.QueryTypes.SELECT }
      ).then(async arr => {
        Promise.all(
          arr.map(record => {
            const orderMap = {
                0: 1,
                1: 2,
                2: 0
            };

            return queryInterface.bulkUpdate('topics', {
                order : orderMap[record.order]
            }, { id: record.id }, {});
          })
        );

        return Promise.resolve();
      });
  }
};
