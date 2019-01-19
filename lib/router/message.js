const Router = require('@trop/async_router')

const {get_request_ip} = require('../util')

let router = new Router()

router.
post('/', async (req, res) => {
    await req.sv.auth.verify(req, ['w', 'rw'])

    try {
        req.sv.dflow.verify('//trop/front/post_message_req#/body', req.body)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    req.body.ip = get_request_ip(req)
    let id = await req.sv.message_store.create(req.body)
    res.status(201).json({
        _id: id
    })
})

router.
get('/', async (req, res) => {
    await req.sv.auth.verify(req, ['r', 'rw'])

    try {
        req.query.p = req.query.p ? parseInt(req.query.p) : undefined
        req.query.s = req.query.s ? parseInt(req.query.s) : undefined
        req.sv.dflow.verify('//trop/front/get_message_req#/query', req.query)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    let items = await req.sv.message_store.find()
    res.json(items)
})

module.exports = router.express
