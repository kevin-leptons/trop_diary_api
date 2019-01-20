const {Http400, Http401, Http403} = require('../error')

function error_middleware(err, req, res, next) {
    if (err instanceof Http400) {
        res.status(400).json({})
    } else if (err instanceof Http401) {
        res.status(401).json({})
    } else if (err instanceof Http403) {
        res.status(403).json({})
    } else {
        req.sv.system_store.error(err.stack).
        then(error_id => {
            res.status(500).send({
                error_id: error_id
            })
        }).
        catch(e => {
            console.error(e)
        })
    }
}

module.exports = error_middleware
