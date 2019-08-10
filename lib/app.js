const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')

const middleware = require('./middleware')
const factory = require('./factory')
const router = require('./router')
const conf_file = require('./conf_file')

async function run_with_configuration(conf) {
    let app = await get_express_app_from_configuration(conf)

    await _listen(app, conf)
}

async function run_with_configuration_file(file) {
    let conf = conf_file.load(file)
    await run_with_configuration(conf)
}

async function get_express_app_from_configuration(conf) {
    let service = await factory.from_configuration(conf)
    let app = express()

    _load_middleware(app, service)
    return app
}

async function get_express_app_from_configuration_file(file) {
    let conf = conf_file.load(file)
    let app = await get_express_app_from_configuration(conf)

    return app
}

module.exports = {
    run_with_configuration,
    run_with_configuration_file,
    get_express_app_from_configuration,
    get_express_app_from_configuration_file
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
