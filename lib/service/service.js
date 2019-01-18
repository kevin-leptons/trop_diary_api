const path = require('path')

const {DataFlow} = require('@trop/dflow')

const Store = require('./store')
const MessageStore = require('./message_store')
const SystemStore = require('./system_store')

class Service {
    constructor() {
    }

    /*
    Argument
        * conf / object / {}.
        * conf.store / string / URL refers to MongoDB.
    */
    async init(conf) {
        this._store = new Store()
        await this._store.connect(conf.store)

        this._message_store = new MessageStore(this._store)
        this._system_store = new SystemStore(this._store)
        this._dflow = new DataFlow([
            path.join(__dirname, '../../schema')
        ])
    }

    async close() {
        await this._store.close()
    }

    get store() {
        return this._store
    }

    get message_store() {
        return this._message_store
    }

    get system_store() {
        return this._system_store
    }

    get dflow() {
        return this._dflow
    }
}

module.exports = Service
