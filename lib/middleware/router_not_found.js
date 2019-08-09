const uuid = require('uuid-mongodb')

const {ErrorStorage} = require('../service')

function router_not_found(req, res, next) {
    _router_not_found(req, res, next).
    catch(e => {
        res.status(500).json({
            message: 'Fatal Error'
        })
        console.error(e)
    })
}

module.exports = router_not_found

// private members

async function _router_not_found(req, res, next) {
    let error_storage = req.service.get(ErrorStorage)
    let message = 'Route Not Found'
    let log_id = await error_storage.write(req, 404, error_data)
    let res_data = {
        log_id: uuid.from(id).toString(),
        message: message
    }

    res.status(404).json(res_data)
}
