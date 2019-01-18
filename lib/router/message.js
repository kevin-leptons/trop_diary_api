const Router = require('@trop/async_router')

const {get_request_ip} = require('../util')

let router = new Router()

router.
post('/', async (req, res) => {
    req.body.ip = get_request_ip(req)

    let id = await req.sv.message_store.create(req.body)
    res.json({
        _id: id
    })
})

router.
get('/', async (req, res) => {
    let items = await req.sv.message_store.find()

    res.json(items)
})

module.exports = router.express
