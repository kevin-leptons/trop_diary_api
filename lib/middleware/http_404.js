const uuid = require('uuid-mongodb')

const {Http404} = require('../error')

function http_404(req, res, next) {
    let err = new Http404('Wrong way!, Are you lost?')

    req.sv.error_store.write(req, err).
    then(id => {
        res.status(404).json({
            log_id: uuid.from(id).toString(),
            error: err.front
        })
    })
}

module.exports = http_404
