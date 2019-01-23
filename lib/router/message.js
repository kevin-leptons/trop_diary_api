const Router = require('@trop/async_router')
const uuid = require('uuid-mongodb')

const {get_request_ip, parse_query_int} = require('../util')
const {Http404} = require('../error')

let router = new Router()

router.
get('/', async (req, res) => {
    await req.sv.auth.verify(req, ['r', 'rw'])

    parse_query_int(req.query, ['p', 'll', 'ul', 'lc', 'uc'])
    req.sv.dflow.verify('//trop/front/get_message_req#/query', req.query)

    let items = await req.sv.message_store.list({
        page_index: req.query.p,
        lower_level: req.query.ll,
        upper_level: req.query.ul,
        label: req.query.l,
        lower_created: req.query.lc,
        upper_created: req.query.uc
    })
    for (let item of items) {
        item._id = uuid.from(item._id).toString()
    }
    res.json(items)
})

router.
get('/item/:id', async (req, res) => {
    await req.sv.auth.verify(req, ['r', 'rw'])

    req.sv.dflow.verify('//trop/front/get_message_item_req#/param', req.params)

    let id = uuid.from(req.params.id)
    let item = await req.sv.message_store.find(id)
    if (!item) {
        throw new Http404()
    } else {
        item._id = uuid.from(item._id).toString()
        res.json(item)
    }
})

router.
post('/', async (req, res) => {
    await req.sv.auth.verify(req, ['w', 'rw'])

    req.sv.dflow.verify('//trop/front/post_message_req#/body', req.body)

    req.body.ip = get_request_ip(req)
    let id = await req.sv.message_store.create(req.body)
    res.status(201).json({
        _id: id.toString()
    })
})

module.exports = router.express
