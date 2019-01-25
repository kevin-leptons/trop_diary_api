const {Http400} = require('../error')

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
            next(new Http400('Invalid JSON data', e))
            return
        }

        next()
    }
}

module.exports = json_middleware
