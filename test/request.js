const supertest = require('supertest')

class Request {
    constructor(express_app) {
        this._supertest = supertest(express_app)
    }

    set_token(token) {
        this._auth_header = 'Bearer ' + token
    }

    async get(path, params) {
        return await this._request('get', path, params)
    }

    async post(path, data, params) {
        return await this._request('post', path, params, data)
    }

    async put(path, data, params) {
        return await this._request('put', path, params, data)
    }

    async patch(path, data, params) {
        return await this._request('patch', path, params, data)
    }

    async delete(path, params) {
        return await this._request('delete', path, params)
    }

    // PRIVATE MEMBERS

    async _request(method, path, params, data) {
        let req = this._create_request(method, path)
        if (params) {
            req.query(params)
        }
        if (data) {
            req.send(data)
        }
        this._set_auth_header(req)

        try {
            let res = await req
            return {
                status: res.status,
                body: res.body
            }
        } catch (e) {
            return {
                status: e.response.status,
                body: e.response.body
            }
        }
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
