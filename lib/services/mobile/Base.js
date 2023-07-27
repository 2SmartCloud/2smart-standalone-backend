const { default: ChistaUseCaseBase } = require('chista/ServiceBase');

class UseCaseBase extends ChistaUseCaseBase {
    static setSequelizeInstance(sequelize) {
        UseCaseBase.sequelizeInstance = sequelize;
    }

    run(...args) {
        if (!UseCaseBase.sequelizeInstance) return super.run(...args);

        const run = super.run.bind(this);
        const transaction = global.testTransaction || undefined;

        return UseCaseBase.sequelizeInstance.transaction({ transaction }, () => run(...args));
    }
}

module.exports = UseCaseBase;
