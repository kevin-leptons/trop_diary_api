function service_middleware(service) {
    return (req, res, next) => {
        req.service = service
        next()
    }
}

module.exports = service_middleware
