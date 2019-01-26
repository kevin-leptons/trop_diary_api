const uuid = require('uuid-mongodb')

const util = require('../util')

class ErrorStore {
    constructor(store) {
        this._doc = store.collection('error')
    }

    async init() {
        await this._create_indexes()
    }

    /*
    Log HTTP 4xx error

    Input
        * req / express.Request
        * err / HttpError
    */
    async write(req, err) {
        let msg = this._raw_http_message(req, err.status)
        msg.front = err.front
        msg.back = err.stack
        msg.origin = (err.back instanceof Error) ? err.back.stack : err.back

        return await this._write(msg)
    }

    // PRIVATE MESSAGE

    async _write(raw) {
        raw._id = uuid.v4()
        raw.created = util.timestamp()

        let res = await this._doc.insertOne(raw)
        return res.insertedId
    }

    async _create_indexes() {
        await this._doc.createIndex({
            created: -1
        })
    }

    _raw_http_message(req, status) {
        return {
            req: {
                method: req.method.toLowerCase(),
                path: req.path,
                query: req.query,
                body: this._to_text(req.body)
            },
            res: {
                status: status
            }
        }
    }

    _to_text(object) {
        if (object instanceof Buffer) {
            return object.toString()
        } else {
            return object
        }
    }
}

module.exports = ErrorStore
