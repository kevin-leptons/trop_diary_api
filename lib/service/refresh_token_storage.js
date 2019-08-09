const {IService, Config} = require('@trop/factory')
const uuid = require('uuid-mongodb')

const Storage = require('./storage')

class RefreshTokenStorage extends IService {
    static get dependency() {
        return [Storage]
    }

    constructor(storage) {
        super()
        this._storage = storage
    }

    async open() {
        this._coll = this._storage.collection('refresh_token')
    }

    async close() {}

    async create(account_id) {
        let id = uuid.v4()
        await this._coll.insertOne({
            _id: id,
            account_id: account_id
        })
        return id.toString()
    }

    async find(id) {
        return this._coll.findOne({
            _id: id
        })
    }

    async remove(id) {
        return this._coll.removeOne({
            _id: id
        })
    }
}

module.exports = RefreshTokenStorage
