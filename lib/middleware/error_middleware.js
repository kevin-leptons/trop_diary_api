const uuid = require('uuid-mongodb')

const {HttpError} = require('../error')
const raw_system_log = require('./raw_system_log')

function error_middleware(err, req, res, next) {
    if (err instanceof HttpError) {
        _log_http_error(req, err).
        then(id => {
            res.status(err.status).json({
                log_id: id,
                error: err.front
            })
        })
    } else {
        _log_unexpected_error(req, err).
        then(id => {
            res.status(500).json({
                log_id: id
            })
        })
    }
}

async function _log_http_error(req, err) {
    let message = raw_system_log(req, err.status)
    message.stack = err.stack
    message.front = err.front
    message.back = err.back

    let id = await req.sv.system_store.error(message)
    return uuid.from(id).toString()
}

async function _log_unexpected_error(req, err) {
    let message = raw_system_log(req, 500)
    if (err instanceof Error) {
        message.stack = err.stack
    } else {
        message.back = err
    }

    let id = await req.sv.system_store.error(message)
    return uuid.from(id).toString()
}

module.exports = error_middleware
