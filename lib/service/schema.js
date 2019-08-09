const {IService, Config} = require('@trop/factory')
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
            throw new HttpError(400, undefined, undefined, e)
        }
    }

    raw_verify(id, data) {
        let e = this._dflow.verify(id, data)
        if (e) {
            throw new InvalidData(e)
        }
    }
}

module.exports = Schema
