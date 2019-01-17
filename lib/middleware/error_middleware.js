function error_middleware(err, req, res, next) {
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

module.exports = error_middleware
