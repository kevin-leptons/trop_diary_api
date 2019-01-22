const {Http4xx} = require('../error')

function error_middleware(err, req, res, next) {
    if (err instanceof Http4xx) {
        _log_error(req, err.error, err.status).
        then(id => {
            res.status(err.status).json({
                log_id: id,
                error: err.error
            })
        })
    } else {
        _log_error(req, err, 500).
        then(id => {
            res.status(500).json({
                log_id: id
            })
        })
    }
}

async function _log_error(req, error, status) {
    let message = {
        req_url: req.originalUrl,
        req_method: req.method,
        req_body: req.body,
        res_status: status,
        error: error
    }

    return await req.sv.system_store.error(message)
}

module.exports = error_middleware
