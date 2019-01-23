const uuid = require('uuid-mongodb')

class RefreshTokenStore {
    constructor(store) {
        this._doc = store.collection('refresh_token')
    }

    async init() {
        await this._create_indexes()
    }

    async create(account_id) {
        let id = uuid.v4()
        await this._doc.insertOne({
            _id: id,
            account_id: account_id
        })
        return id.toString()
    }

    async find(id) {
        return await this._doc.findOne({
            _id: id
        })
    }

    async remove(id) {
        return await this._doc.removeOne({
            _id: id
        })
    }

    // PRIVATE MEMBERS

    async _create_indexes() {
    }
}

module.exports = RefreshTokenStore
