const ChistaX = require('chista/Exception').default;

class X extends ChistaX {
    constructor(params) {
        super(params);

        this.fields = params.fields;
    }
}

module.exports = X;
