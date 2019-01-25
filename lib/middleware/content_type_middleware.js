const {Http4xx} = require('../error')

function content_type_middleware() {
    return (req, res, next) => {
        if (req.is('application/json') === false) {
            next(new Http4xx(415, 'Support only application/json'))
            return
        }
        if (!req.accepts('application/json')) {
            next(new Http4xx(406, 'Accept only application/json'))
            return
        }
        next()
    }
}

module.exports = content_type_middleware
