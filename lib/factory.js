const {Factory, Config} = require('@trop/factory')

const conf_file = require('./conf_file')
const service = require('./service')

async function fromConfiguration(conf) {
    let service_array = _makeServiceArray()
    let service_conf = _makeServiceConfig(conf)
    let factory = new Factory(service_array, service_conf)

    await factory.open()
    let account = factory.get(service.AccountStorage)

    console.log(conf);
    await account.create_root(conf.root_email)
    return factory
}

async function fromConfigurationFile(file) {
    let conf = conf_file.load(file)
    let factory = await fromConfiguration(conf)

    return factory
}

module.exports = {
    fromConfiguration,
    fromConfigurationFile
}

// private members

function _makeServiceArray() {
    return Object.values(service)
}

function _makeServiceConfig(conf) {
    let service_conf = new Config()

    for (let k of Object.keys(conf)) {
        service_conf[k] = conf[k]
    }
    return service_conf
}
