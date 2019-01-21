class MessageStore {
    constructor(gconf, store) {
        this._gconf = gconf
        this._doc = store.collection('message')
    }

    async count() {
        return this._doc.estimatedDocumentCount()
    }

    /*
    Argument
        * conf / Object / {}
        * conf.p / Integer / 1
    */
    async list(conf={}) {
        conf.p = conf.p ? conf.p : 1

        return await this._doc.find({}).
        skip((conf.p - 1) * this._gconf.page_size).
        limit(this._gconf.page_size).
        toArray()
    }

    async create(item) {
        item.date = new Date()

        let res = await this._doc.insertOne(item)
        return res.insertedId
    }
}

module.exports = MessageStore
