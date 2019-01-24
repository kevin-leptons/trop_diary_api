const path = require('path')
const fs = require('fs')

const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')

const middleware = require('./middleware')
const service = require('./service')
const router = require('./router')

class App {
    /*
    Argument
        * conf / object / {}.
        * conf.conf_file / string, path to configuration file
        * conf.clean / boolean / false, clean database
    */
    constructor(conf={}) {
        this._conf = this._read_conf(conf)
    }

    async start(port=8080, host='0.0.0.0') {
        await this._init()
        this._server = this._app.listen(port, host, () => {
            let addr = this._server.address()
            console.log(`Online at "http://${addr.address}:${addr.port}"`)
        })
    }

    async close() {
        await this._close_server()
        await this._close_service()
    }

    get express() {
        return this._app
    }

    get service() {
        return this._service
    }

    // PRIVATE MEMBERS

    _read_conf(conf) {
        let raw_conf = fs.readFileSync(conf.conf_file)
        let fconf = JSON.parse(raw_conf)
        let conf_dir = path.dirname(conf.conf_file)

        return {
            store: fconf.store,
            root_email: fconf.root_email,
            private_key: path.join(conf_dir, fconf.private_key),
            clean: conf.clean
        }
    }

    async _close_server() {
        return new Promise((resolve) => {
            if (!this._server) {
                resolve()
            }
            this._server.close(() => {
                resolve()
            })
        })
    }

    async _close_service() {
        if (!this._service) {
            return
        }

        await this._service.close()
    }

    async _init() {
        this._service = await service(this._conf)
        this._app = express()

        this._app.use(cors())
        this._app.use(body_parser.json())
        this._app.use(middleware.service(this._service))

        this._app.use('/', router.root)
        this._app.use('/token', router.token)
        this._app.use('/account', router.account)
        this._app.use('/key', router.key)
        this._app.use('/message', router.message)

        this._app.use(middleware.error)
    }
}

module.exports = App
