const {App} = require('../lib')

let _app = null

async function get_app() {
    if (!_app) {
        _app = new App()
        await _app._init()
    }
    return _app
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
    service: get_service
}
