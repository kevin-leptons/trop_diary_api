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
        await this._connect()
        if (this._conf.clean) {
            await this.reset()
        }
        await this._create_indexes()
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

    async reset() {
        await this._database.dropDatabase()
        await this._create_indexes()
    }

    // private members

    async _connect() {
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        if (this._conf.storage.username) {
            options.auth = {
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

    async _create_indexes() {
        await this._create_account_indexes()
        await this._create_error_indexes()
        await this._create_message_indexes()
    }

    async _create_account_indexes() {
        let indexes = {email: 1}
        let options = {
            unique: true,
            background: false
        }
        let coll = this._database.collection('account')
        await coll.createIndex(indexes, options)
    }

    async _create_error_indexes() {
        let coll = this._database.collection('error')

        await coll.createIndex({
            created: -1
        })
    }

    async _create_message_indexes() {
        let coll = this._database.collection('message')

        await coll.createIndex({level: -1})
        await coll.createIndex({created: -1})
        await coll.createIndex({label: -1})
        await coll.createIndex({level: -1, created: -1, label: -1})
    }

    _get_database_name(endpoint) {
        let url = new URL(endpoint)
        let dbname = url.pathname.substr(1)

        return dbname
    }
}

module.exports = Storage
