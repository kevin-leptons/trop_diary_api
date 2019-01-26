const uuid = require('uuid-mongodb')

const {HttpError, Http500} = require('../error')

function error_middleware(err, req, res, next) {
    if (err instanceof HttpError) {
        req.sv.error_store.write(req, err).
        then(id => {
            res.status(err.status).json({
                log_id: uuid.from(id).toString(),
                error: err.front
            })
        })
    } else {
        let http_error = new Http500(null, err)
        req.sv.system_store.write(req, http_error).
        then(id => {
            res.status(500).json({
                log_id: uuid.from(id).toString()
            })
        })
    }
}

module.exports = error_middleware
