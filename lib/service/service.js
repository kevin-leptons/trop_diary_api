const path = require('path')

const {DataFlow} = require('@trop/dflow')

const GlobalConf = require('./global_conf')
const Certification = require('./certification')
const Store = require('./store')
const AccountStore = require('./account_store')
const RefreshTokenStore = require('./refresh_token_store')
const Auth = require('./auth')
const MessageStore = require('./message_store')
const SystemStore = require('./system_store')
const DFlow = require('./dflow')

class Service {
    constructor() {
    }

    /*
    Argument
        * conf / object / {}.
        * conf.store / string / URL refers to MongoDB.
        * conf.private_key / string / path to privat key file.
        * conf.root_email / string / null.
        * conf.clean / boolean / false, clear all existed data.
    */
    async init(conf) {
        this._gconf = new GlobalConf()
        this._cert = new Certification(conf.private_key)
        this._dflow = new DFlow()

        this._store = new Store()
        await this._store.connect(conf.store)
        if (conf.clean) {
            await this._store.clean()
        }

        this._account_store = new AccountStore(this._gconf, this._store)
        await this._account_store.init()

        this._refresh_token_store = new RefreshTokenStore(this._store)
        await this._refresh_token_store.init()

        this._auth = new Auth(
            this._account_store,
            this._refresh_token_store,
            this._cert
        )
        this._message_store = new MessageStore(this._gconf, this._store)
        this._system_store = new SystemStore(this._store)
        await this._system_store.init()

        if (conf.root_email) {
            await this._account_store.create_root(conf.root_email)
        }
    }

    async close() {
        await this._store.close()
    }

    get store() {
        return this._store
    }

    get account_store() {
        return this._account_store
    }

    get auth() {
        return this._auth
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

    get keygen() {
        return this._keygen
    }
}

module.exports = Service
