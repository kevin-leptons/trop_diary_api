const uuidv4 = require('uuid/v4')

class RefreshTokenStore {
    constructor(store) {
        this._doc = store.collection('refresh_token')
    }

    async init() {
        await this._create_indexes()
    }

    async create(account_id) {
        let id = uuidv4().toString()

        await this._doc.insertOne({
            id: id,
            account_id: account_id
        })
        return id
    }

    async find(id) {
        return await this._doc.findOne({
            id: id
        })
    }

    async remove(id) {
        return await this._doc.removeOne({
            id: id
        })
    }

    // PRIVATE MEMBERS

    async _create_indexes() {
        await this._doc.createIndex({id: 1}, {unique: true})
    }
}

module.exports = RefreshTokenStore
