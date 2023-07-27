const ChistaESModule = require('chista');

const { makeServiceRunner } = require('./utils/chistaUtils');

const Chista = ChistaESModule.default;
const chista = new Chista({
    defaultLogger : (type, data) => {
        const { result } = data;

        if (result instanceof Error || type === 'error') console.log(JSON.stringify({ level: 'warning', message: data }));
    }
});

chista.makeServiceRunner = makeServiceRunner;

module.exports = chista;
