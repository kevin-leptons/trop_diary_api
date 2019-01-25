const uuid = require('uuid-mongodb')

const raw_system_log = require('./raw_system_log')

function http_404(req, res, next) {
    let message = raw_system_log(req, 404)
    req.sv.system_store.error(message).
    then(id => {
        res.status(404).json({
            log_id: uuid.from(id).toString(),
            error: "Wrong way!, Are you lost?"
        })
    })
}

module.exports = http_404
