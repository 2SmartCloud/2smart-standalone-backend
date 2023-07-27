module.exports = {
  up : (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;
    return sequelize.query(`SELECT * FROM scenarios`, { type: sequelize.QueryTypes.SELECT, logging:console.log })
        .then(async (arr) => {
          for (const el of arr) {
            if (!el.params || typeof el.params.SWITCH_TOPIC !== 'string') continue;
            el.params.SWITCH_TOPIC = el.params.SWITCH_TOPIC.split(',').map(t => t.trim()).filter(t => !!t);
            await queryInterface.bulkUpdate(
                'scenarios',
                el,
                { id: el.id },
                {},
                { params: { type: new Sequelize.JSON() } }
            );
          }
        });
  },
  down : (queryInterface, Sequelize) => {
  }
};
