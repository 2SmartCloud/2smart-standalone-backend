const Promise = require('bluebird');

async function reindexPosition(Screens, transaction) {
    const screens = await Screens.findAll({
        order : [ [ 'createdAt', 'ASC' ] ]
    });

    await Promise.each(screens, async (screen, idx) => {
        await screen.update({ position: idx + 1 }, { transaction });
    });
}

module.exports = reindexPosition;
