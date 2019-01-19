class AuthError extends Error {
    constructor() {
        super()
        this.name = this.constructor.name
    }
}

class Http401 extends Error {
    constructor() {
        super()
        this.name = this.constructor.name
    }
}

class Http403 extends Error {
    constructor() {
        super()
        this.name = this.constructor.name
    }
}

module.exports = {
    AuthError: AuthError,
    Http401: Http401,
    Http403: Http403
}
