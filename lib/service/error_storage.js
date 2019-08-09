const {IService, Config} = require('@trop/factory')
const uuid = require('uuid-mongodb')

const util = require('../util')
const Storage = require('./storage')

class ErrorStorage extends IService {
    static get dependency() {
        return [Storage]
    }

    constructor(storage) {
        super()
        this._storage = storage
    }

    async open() {
        this._coll = this._storage.collection('error')
        await this._create_indexes()
    }

    async close() {}

    /*
    Log HTTP 4xx error

    Input
        * req / express.Request
        * err / HttpError
    */
    async write(req, status, data) {
        let entry = this._create_log_entry(req, status, data)
        console.log(entry);
        let id = await this._write(entry)

        return id
    }

    // PRIVATE MESSAGE

    async _write(raw) {
        raw._id = uuid.v4()
        raw.created = util.timestamp()

        let res = await this._coll.insertOne(raw)
        return res.insertedId
    }

    async _create_indexes() {
        await this._coll.createIndex({
            created: -1
        })
    }

    _create_log_entry(req, status, data) {
        return {
            req: {
                method: req.method.toLowerCase(),
                path: req.path,
                query: req.query,
                param: req.params,
                body: req.body
            },
            res: {
                status: status
            },
            data: data
        }
    }
}

module.exports = ErrorStorage
