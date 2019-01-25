const uuid = require('uuid-mongodb')

class SystemStore {
    constructor(store) {
        this._doc = store.collection('system')
    }

    async init() {
        await this._create_indexes()
    }

    async info(message) {
        return await this._write(0, message)
    }

    async debug(message) {
        return await this._write(1, message)
    }

    async warn(message) {
        return await this._write(2, message)
    }

    async error(message) {
        return await this._write(3, message)
    }

    async fatal(message) {
        return await this._write(4, message)
    }

    // PRIVATE MESSAGE

    async _write(level, raw) {
        raw._id = uuid.v4()
        raw.created = Math.floor(Date.now() / 1000)
        raw.level = level

        let res = await this._doc.insertOne(raw)
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
