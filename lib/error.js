class AuthError extends Error {
    constructor() {
        super()
        this.name = this.constructor.name
    }
}

module.exports = {
    AuthError: AuthError
}
