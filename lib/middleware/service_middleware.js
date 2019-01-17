function service_middleware(service) {
    return (req, res, next) => {
        req.sv = service
        next()
    }
}

module.exports = service_middleware
