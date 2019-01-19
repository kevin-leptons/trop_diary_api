const path = require('path')

const {App} = require('../lib')
const Request = require('./request')

let _app
let _request

async function get_app() {
    if (!_app) {
        _app = new App({
            private_key: path.join(__dirname, '../cert/private.pem'),
            root_email: 'root@mail.com',
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

module.exports = {
    close: close,
    app: get_app,
    service: get_service,
    request: get_request
}
