class HttpError extends Error {
    constructor(status, error) {
        super()
        this.name = this.constructor.name
        this.status = status
        this.error = error
    }
}

class Http4xx extends HttpError {
    constructor(status, error) {
        super(status, error)
        this.name = this.constructor.name
    }
}

class Http400 extends Http4xx {
    constructor(error) {
        super(400, error)
        this.name = this.constructor.name
    }
}

class Http401 extends Http4xx {
    constructor(error) {
        super(401, error)
        this.name = this.constructor.name
    }
}

class Http403 extends Http4xx {
    constructor(error) {
        super(403, error)
        this.name = this.constructor.name
    }
}

class Http404 extends Http4xx {
    constructor(error) {
        super(404, error)
        this.name = this.constructor.name
    }
}

module.exports = {
    HttpError: HttpError,
    Http4xx: Http4xx,
    Http401: Http401,
    Http400: Http400,
    Http403: Http403,
    Http404: Http404
}
