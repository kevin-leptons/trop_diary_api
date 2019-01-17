const {MongoClient} = require('mongodb')

class Store {
    constructor() {
    }

    async connect(url) {
        let dbname = this._get_database_name(url)
        this._client = await MongoClient.connect(url, {useNewUrlParser: true})
        this._database = this._client.db(dbname)
    }

    async close() {
        await this._client.close()
    }

    collection(name) {
        return this._database.collection(name)
    }

    // PRIVATE MEMBERS

    _get_database_name(url) {
        let parsed = new URL(url)
        return parsed.pathname.substr(1)
    }
}

module.exports = Store
