function raw_system_log(req, status) {
    return {
        req_path: req.path,
        req_query: req.query,
        req_method: req.method,
        req_body: _to_text(req.body),
        res_status: status
    }
}

function _to_text(object) {
    if (object instanceof Buffer) {
        return object.toString()
    } else {
        return object
    }
}

module.exports = raw_system_log
