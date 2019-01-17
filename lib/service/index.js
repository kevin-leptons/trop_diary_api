const Service = require('./service')

async function create_service(conf) {
    let service = new Service()

    await service.init(conf)
    return service
}

module.exports = create_service
