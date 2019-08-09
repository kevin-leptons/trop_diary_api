const {IService, Config} = require('@trop/factory')
const {MongoClient} = require('mongodb')

class Storage extends IService {
    static get dependency() {
        return [Config]
    }

    constructor(conf) {
        super(conf)
        this._conf = conf
    }

    async open() {
        let options = {
            useNewUrlParser: true,
            auth: {
                user: this._conf.storage.username,
                password: this._conf.storage.password
            }
        }
        this._client = await MongoClient.connect(
            this._conf.storage.endpoint,
            options
        )

        let dbname = this._get_database_name(this._conf.storage.endpoint)
        this._database = this._client.db(dbname)
    }

    async close() {
        if (this._client) {
            await this._client.close()
            this._client = undefined
        }
    }

    async close() {
        await this._client.close()
    }

    collection(name) {
        return this._database.collection(name)
    }

    async clean() {
        await this._database.dropDatabase()
    }

    // private members

    _get_database_name(endpoint) {
        let url = new URL(endpoint)
        let dbname = url.pathname.substr(1)

        return dbname
    }
}

module.exports = Storage
