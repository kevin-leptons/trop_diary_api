const path = require('path')

const {App} = require('../lib')
const Request = require('./request')

let _app
let _request
let _values = {}

async function get_app() {
    if (!_app) {
        _app = new App({
            conf_file: path.join(__dirname, 'conf', 'conf.json'),
            clean: true
        })
        await _app._init()
    }
    return _app
}

async function get_request() {
    if (!_request) {
        let app = await get_app()
        _request = new Request(app.express)
    }

    return _request
}

async function get_service() {
    let app = await get_app()
    return app.service
}

async function close() {
    if (_app) {
        await _app.close()
    }
}

function set_key(key, value) {
    _values[key] = value
}
function get_key(key) {
    return _values[key]
}

module.exports = {
    close: close,
    set_key: set_key,
    get_key: get_key,
    app: get_app,
    service: get_service,
    request: get_request
}
