class MessageStore {
    constructor(store) {
        this._doc = store.collection('message')
    }

    async count() {
        return this._doc.estimatedDocumentCount()
    }

    async create(item) {
        item.date = new Date()
        item.label = item.label || null

        let res = await this._doc.insertOne(item)
        return res.insertedId
    }

    async find() {
        return await this._doc.find().toArray()
    }
}

module.exports = MessageStore
