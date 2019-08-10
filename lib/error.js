const {ErrorChain} = require('@trop/gear').error

class HttpError extends ErrorChain {
    constructor(status, message, prev_error, context) {
        super(message, prev_error, context)
        this.name = this.constructor.name
        this.status = status
    }
}

class InvalidData extends ErrorChain {
    constructor(message, prev_error, context) {
        super(message, prev_error, context)
        this.name = this.constructor.name
    }
}

module.exports = {
    HttpError: HttpError,
    InvalidData: InvalidData
}
