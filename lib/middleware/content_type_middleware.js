const {HttpError} = require('../error')

function content_type_middleware() {
    return (req, res, next) => {
        if (req.is('application/json') === false) {
            let err = new HttpError(415, 'Support only application/json')
            next(err)
            return
        }
        if (!req.accepts('application/json')) {
            let err = new HttpError(406, 'Accept only application/json')
            next(e)
            return
        }
        next()
    }
}

module.exports = content_type_middleware
