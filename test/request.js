const supertest = require('supertest')

class Request {
    constructor(express_app) {
        this._supertest = supertest(express_app)
    }

    set_token(token) {
        this._auth_header = 'Bearer ' + token
    }

    get(path) {
        return this._request('get', path)
    }

    post(path) {
        return this._request('post', path)
    }

    put(path) {
        return this._request('put', path)
    }

    patch(path) {
        return this._request('patch', path)
    }

    delete(path) {
        return this._request('delete', path)
    }

    // PRIVATE MEMBERS

    _request(method, path) {
        let req = this._create_request(method, path)
        this._set_auth_header(req)
        return req
    }

    _create_request(method, path) {
        switch (method) {
            case 'get': return this._supertest.get(path)
            case 'post': return this._supertest.post(path)
            case 'put': return this._supertest.put(path)
            case 'patch': return this._supertest.patch(path)
            case 'delete': return this._supertest.delete(path)
            default:
                throw Error(`Invalid method "${method}"`)
        }
    }

    _set_auth_header(req) {
        if (this._auth_header) {
            req.set('Authorization', this._auth_header)
        }
    }
}

module.exports = Request
