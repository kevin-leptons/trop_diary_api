const uuid = require('uuid-mongodb')

class SystemStore {
    constructor(store) {
        this._doc = store.collection('system')
    }

    async info(message, label=null) {
        return this._write({
            level: 'info',
            message: message,
            label: label
        })
    }

    async error(message, label=null) {
        return this._write({
            level: 'error',
            message: message,
            label: label
        })
    }

    async critical(message, label=null) {
        return this._write({
            level: 'critical',
            message: message,
            label: label
        })
    }

    // PRIVATE MESSAGE

    async _write(item) {
        let new_item = Object.assign({}, item)
        new_item._id = uuid.v4()
        new_item.date = new Date()

        let res = await this._doc.insertOne(new_item)
        return res.insertedId.toString()
    }
}

module.exports = SystemStore
