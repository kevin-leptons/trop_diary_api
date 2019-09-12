const {IService, Config} = require('@trop/factory')
const uuid = require('uuid-mongodb')

const Storage = require('./storage')

class MessageStorage extends IService {
    static get dependency() {
        return [Config, Storage]
    }

    constructor(conf, storage) {
        super()
        this._conf = conf
        this._storage = storage
    }

    async open() {
        this._coll = this._storage.collection('message')
    }

    async close() {}

    async count() {
        return this._coll.estimatedDocumentCount()
    }

    // Input
    // * conf / Object / {}
    // * conf.page_index / Integer / 1
    // * conf.lower_level / Integer
    // * conf.upper_level / Integer
    // * conf.label / String
    //
    // Output - Array<Object> - List of message by newest order
    // * _id / String - UUID
    // * ip / String - Internet address
    // * created / Integer - UNIX timestamp, created date
    // * level / Integer - Log level
    // * message / Any - Content of message
    async list(conf={}) {
        conf.page_index = conf.page_index ? conf.page_index : 1
        let query = {}
        if (conf.lower_level) {
            query.level = {
                $gte: conf.lower_level
            }
        }
        if (conf.upper_level) {
            if (!query.level) {
                query.level = {}
            }
            query.level.$lte = conf.upper_level
        }
        if (conf.lower_created) {
            query.created = {
                $gte: conf.lower_created
            }
        }
        if (conf.upper_created) {
            if (!query.created) {
                query.created = {}
            }
            query.created.$lte = conf.upper_created
        }
        if (conf.label) {
            query.label = conf.label
        }
        let options = {
            projection: {
                data: 0
            }
        }

        return await this._coll.find(query, options).
        sort({created: -1}).
        skip((conf.page_index - 1) * this._conf.page_size).
        limit(this._conf.page_size).
        toArray()
    }

    async find(id) {
        return this._coll.findOne({
            _id: id
        })
    }

    /*
    Argument
        * item / Object / {}
        * item.level / Integer
        * item.label / String
        * item.ip / String
        * item.message / String
    */
    async create(item) {
        item._id = uuid.v4()
        item.created = Math.floor(Date.now() / 1000)

        let res = await this._coll.insertOne(item)
        return res.insertedId
    }
}

module.exports = MessageStorage
