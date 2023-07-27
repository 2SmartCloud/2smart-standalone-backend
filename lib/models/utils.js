const bcrypt = require('bcryptjs');

function prepareSearchString(texts) {
    return texts.map(text => {
        return text.replace(/<\/?[^>]+>/g, ' ')
            .replace(/[^A-Za-zА-Яа-яЁё0-9]|\s/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .toLowerCase();
    }).join(' ');
}

const SALT_ROUNDS = 2;

const passwordMethods = {
    checkPassword(plain) {
        return bcrypt.compare(plain, this.passwordHash);
    },
    checkPin(plain) {
        return bcrypt.compare(plain, this.pinHash);
    },
    encrypt(word) {
        const salt = bcrypt.genSaltSync(SALT_ROUNDS); // eslint-disable-line no-sync

        return bcrypt.hashSync(word, salt); // eslint-disable-line no-sync
    }
};

function injectMethods(targetClass, methods) {
    for (const method in methods) {
        /* istanbul ignore else */
        if (methods.hasOwnProperty(method)) {
            // eslint-disable-next-line no-param-reassign
            targetClass.prototype[method] = methods[method];
        }
    }
}

module.exports = {
    prepareSearchString,
    passwordMethods,
    injectMethods
};
