const {Factory, Config} = require('@trop/factory')

const conf_file = require('./conf_file')
const service = require('./service')

async function from_configuration(conf) {
    let service_array = _make_service_array()
    let service_conf = _make_service_config(conf)
    let factory = new Factory(service_array, service_conf)

    await factory.open()

    let account = factory.get(service.AccountStorage)
    await account.create_root(conf.root_email)

    return factory
}

async function from_configuration_file(file) {
    let conf = conf_file.load(file)
    let factory = await from_configuration(conf)

    return factory
}

module.exports = {
    from_configuration,
    from_configuration_file
}

// private members

function _make_service_array() {
    return Object.values(service)
}

function _make_service_config(conf) {
    let service_conf = new Config()

    for (let k of Object.keys(conf)) {
        service_conf[k] = conf[k]
    }
    return service_conf
}
