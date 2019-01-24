const uuid = require('uuid-mongodb')

class SystemStore {
    constructor(store) {
        this._doc = store.collection('system')
    }

    async init() {
        await this._create_indexes()
    }

    async info(message, label=null) {
        return this._write({
            level: 0,
            message: message,
            label: label
        })
    }

    async debug(message, label=null) {
        return this._write({
            level: 1,
            message: message,
            label: label
        })
    }

    async warn(message, label=null) {
        return this._write({
            level: 2,
            message: message,
            label: label
        })
    }

    async error(message, label=null) {
        return this._write({
            level: 3,
            message: message,
            label: label
        })
    }

    async fatal(message, label=null) {
        return this._write({
            level: 4,
            message: message,
            label: label
        })
    }

    // PRIVATE MESSAGE

    async _write(item) {
        item._id = uuid.v4()
        item.created = Math.floor(Date.now() / 1000)

        let res = await this._doc.insertOne(item)
        return res.insertedId
    }

    async _create_indexes() {
        await this._doc.createIndex({
            level: -1,
            created: -1
        })
    }
}

module.exports = SystemStore
