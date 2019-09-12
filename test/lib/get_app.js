const path = require('path')

const {app} = require('../../lib')

let _app = undefined

async function get_app() {
    if (_app === undefined) {
        let file = path.join(__dirname, '..', 'conf', 'conf.yaml')
        _app = await app.get_express_app_from_configuration_file(file)
    }
    return _app
}

module.exports = get_app
