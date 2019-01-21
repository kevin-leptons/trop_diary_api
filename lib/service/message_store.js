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
        * conf.page_index / Integer / 1
        * conf.lower_level / Integer
        * conf.upper_level / Integer
        * conf.label / String
    */
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
        if (conf.label) {
            query.label = conf.label
        }

        return await this._doc.find(query).
        skip((conf.page_index - 1) * this._gconf.page_size).
        limit(this._gconf.page_size).
        toArray()
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
        item.created = Math.floor(Date.now() / 1000)

        let res = await this._doc.insertOne(item)
        return res.insertedId
    }
}

module.exports = MessageStore
