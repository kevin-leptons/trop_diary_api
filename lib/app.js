const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')

const middleware = require('./middleware')
const factory = require('./factory')
const router = require('./router')
const conf_file = require('./conf_file')

async function runWithConfiguration(conf) {
    let service = await factory.fromConfiguration(conf)
    let app = express()

    _load_middleware(app, service)
    await _listen(app, conf)
}

async function runWithConfigurationFile(file) {
    let conf = conf_file.load(file)
    await runWithConfiguration(conf)
}

module.exports = {
    runWithConfiguration,
    runWithConfigurationFile
}

// private members

function _load_middleware(app, service) {
    app.use(cors())
    app.use(middleware.service(service))
    app.use(middleware.content_type())
    app.use(body_parser.raw({
        type: 'application/json'
    }))
    app.use(middleware.json())

    app.use('/', router)

    app.use(middleware.error)
    app.use(middleware.router_not_found)
}

async function _listen(app, conf) {
    let server = app.listen(conf.port, conf.host, () => {
        let addr = server.address()
        console.log(`Online at "http://${addr.address}:${addr.port}"`)
    })
}
