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
        if (req.query.p) {
            req.query.p = parseInt(req.query.p)
        }
        if (req.query.ll) {
            req.query.ll = parseInt(req.query.ll)
        }
        if (req.query.ul) {
            req.query.ul = parseInt(req.query.ul)
        }
        if (req.query.lc) {
            req.query.lc = parseInt(req.query.lc)
        }
        if (req.query.uc) {
            req.query.uc = parseInt(req.query.uc)
        }
        req.sv.dflow.verify('//trop/front/get_message_req#/query', req.query)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    let items = await req.sv.message_store.list({
        page_index: req.query.p,
        lower_level: req.query.ll,
        upper_level: req.query.ul,
        label: req.query.l,
        lower_created: req.query.lc,
        upper_created: req.query.uc
    })
    res.json(items)
})

module.exports = router.express
