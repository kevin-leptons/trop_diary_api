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
    Http401: Http401,
    Http403: Http403
}
