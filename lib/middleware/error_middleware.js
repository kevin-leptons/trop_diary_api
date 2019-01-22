const {Http4xx} = require('../error')

function error_middleware(err, req, res, next) {
    if (err instanceof Http4xx) {
        _log_4xx_error(req, err, err.status).
        then(id => {
            res.status(err.status).json({
                log_id: id,
                error: err.error
            })
        })
    } else {
        _log_500_error(req, err, 500).
        then(id => {
            res.status(500).json({
                log_id: id
            })
        })
    }
}

async function _log_4xx_error(req, err, status) {
    let message = _raw_message(req, status)
    message.error = err.error
    return await req.sv.system_store.error(message)
}

async function _log_500_error(req, err, status) {
    let message = _raw_message(req, status)
    message.error = err.stack
    return await req.sv.system_store.error(message)
}

async function _raw_message(req, status) {
    return {
        req_url: req.originalUrl,
        req_method: req.method,
        req_body: req.body,
        res_status: status
    }
}

module.exports = error_middleware
