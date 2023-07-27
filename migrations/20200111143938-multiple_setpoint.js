

module.exports = {
    up : (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;

        return sequelize.query('SELECT * FROM widgets WHERE deviceId = "threshold" and nodeId is null', { type: sequelize.QueryTypes.SELECT })
            .then(arr => arr.forEach(obj => {
                queryInterface.bulkUpdate('widgets', { nodeId: obj.propertyId, propertyId: 'setpoint' }, { id: obj.id });
            }))
            .catch(err => console.log(err));
    },

    down : (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;
        const Op = Sequelize.Op;

        return sequelize.query('SELECT * FROM widgets WHERE deviceId = "threshold" and propertyId = "setpoint"', { type: sequelize.QueryTypes.SELECT })
            .then(arr => arr.forEach(obj => {
                queryInterface.bulkUpdate('widgets', { nodeId: 'null', propertyId: obj.nodeId }, { id: obj.id });
            }))
            .then(() => queryInterface.bulkDelete('widgets', { [Op.and] : [ { deviceId: 'threshold' }, { propertyId : {
                [Op.ne] : 'setpoint'
            } } ] }))
            .catch(err => console.log(err));
    }
};
