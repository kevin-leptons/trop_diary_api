class Http400 extends Error {
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

class Http404 extends Error {
    constructor() {
        super()
        this.name = this.constructor.name
    }
}

module.exports = {
    Http401: Http401,
    Http400: Http400,
    Http403: Http403,
    Http404: Http404
}
