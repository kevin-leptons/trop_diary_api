class HttpError extends Error {
    constructor(status, front, back) {
        super()
        this.name = this.constructor.name
        this.status = status
        this.back = back
        this.front = front
    }
}

class Http4xx extends HttpError {
    constructor(status, front, back) {
        super(status, front, back)
        this.name = this.constructor.name
    }
}

class Http400 extends Http4xx {
    constructor(front, back) {
        super(400, front, back)
        this.name = this.constructor.name
    }
}

class Http401 extends Http4xx {
    constructor(front, back) {
        super(401, front, back)
        this.name = this.constructor.name
    }
}

class Http403 extends Http4xx {
    constructor(front, back) {
        super(403, front, back)
        this.name = this.constructor.name
    }
}

class Http404 extends Http4xx {
    constructor(front, back) {
        super(404, front, back)
        this.name = this.constructor.name
    }
}

class Http406 extends Http4xx {
    constructor(front, back) {
        super(406, front, back)
        this.name = this.constructor.name
    }
}

class Http409 extends Http4xx {
    constructor(front, back) {
        super(409, front, back)
        this.name = this.constructor.name
    }
}

class Http500 extends HttpError {
    constructor(front, back) {
        super(500, front, back)
        this.name = this.constructor.name
    }
}

class InvalidData extends Error {
    constructor(errors) {
        super()
        this.errors = errors
        this.name = this.constructor.name
    }
}

module.exports = {
    HttpError: HttpError,
    Http4xx: Http4xx,
    Http401: Http401,
    Http400: Http400,
    Http403: Http403,
    Http404: Http404,
    Http406: Http406,
    Http409: Http409,
    Http500: Http500,
    InvalidData: InvalidData
}
