const {IService, Config} = require('@trop/factory')
const {ErrorChain} = require('@trop/gear').error
const path = require('path')

const {DataFlow} = require('@trop/dflow')

const {InvalidData, HttpError} = require('../error')

class Schema extends IService {
    static get dependency() {
        return []
    }

    constructor() {
        super()
        let schema_dir = path.join(__dirname, '../../schema')
        this._dflow = new DataFlow([schema_dir])
    }

    async open() {}

    async close() {}

    verify(id, data) {
        let e = this._dflow.verify(id, data)
        if (e) {
            throw new InvalidData('Invalid response status', undefined, e)
        }
    }

    verify_request(id, req) {
        let schema = this._dflow.get(id)

        if (schema.req.param) {
            this._verify_request_param(id, req.params)
        }
        if (schema.req.query) {
            this._verify_request_query(id, req.query)
        }
        if (schema.req.body) {
            this._verify_request_body(id, req.body)
        }
    }

    verify_response(id, res) {
        let schema = this._dflow.get(id)

        if (schema.res.status) {
            this._verify_response_status(id, res.status)
        }
        if (schema.res.body) {
            this._verify_response_body(id, res.body)
        }
    }

    // private members

    _verify_request_param(api_id, data) {
        let schema_id = `${api_id}#/req/param`
        this._verify_on_request(schema_id, data)
    }

    _verify_request_query(api_id, data) {
        let schema_id = `${api_id}#/req/query`
        this._verify_on_request(schema_id, data)
    }

    _verify_request_body(api_id, data) {
        let schema_id = `${api_id}#/req/body`
        this._verify_on_request(schema_id, data)
    }

    _verify_on_request(id, data) {
        let e = this._dflow.verify(id, data)
        if (e) {
            throw new HttpError(400, 'Bad Request', undefined, e)
        }
    }

    _verify_response_status(id, status) {
        let schema_id = `${id}#/res/status`
        let e = this._dflow.verify(schema_id, status)

        if (e) {
            throw new ErrorChain('Invalid response status', e)
        }
    }

    _verify_response_body(id, body) {
        let schema_id = `${id}#/res/body`
        let e = this._dflow.verify(schema_id, body)

        if (e) {
            throw new ErrorChain('Invalid response body', e)
        }
    }
}

module.exports = Schema
