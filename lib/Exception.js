class Exception extends Error {
    constructor({
        type,
        message,
        code,
        errors = []
    }) {
        super();
        if (!type) throw new Error('"type" required');
        if (!message) throw new Error('"message" required');

        if (code) this.code = code;

        this.type = type;
        this.message = message;
        this.errors = errors;
    }
}

module.exports = Exception;
