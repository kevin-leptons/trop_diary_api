class MessageStore {
    constructor(store) {
        this._doc = store.collection('message')
    }

    async count() {
        return this._doc.estimatedDocumentCount()
    }

    async create(item) {
        await this._doc.insertOne(item)
    }

    async find() {
        return await this._doc.find().toArray()
    }
}

module.exports = MessageStore
