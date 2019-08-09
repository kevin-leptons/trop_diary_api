const {HttpError} = require('../error')

function json_middleware() {
    return (req, res, next) => {
        if (req.is('application/json') === null) {
            req.body = null
            next()
            return
        }

        try {
            req.body = JSON.parse(req.body)
        } catch (e) {
            let http_err = new HttpError(400, 'Invalid JSON body', e)

            next(http_err)
            return
        }

        next()
    }
}

module.exports = json_middleware
