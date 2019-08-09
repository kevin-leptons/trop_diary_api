const Router = require('@trop/async_router')
const uuid = require('uuid-mongodb')

const {get_request_ip, parse_query_int} = require('../util')
const {HttpError} = require('../error')
const {
    Schema,
    Auth,
    MessageStorage
} = require('../service')

let router = new Router()

router.
get('/', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['r', 'rw'])

    parse_query_int(req.query, ['p', 'll', 'ul', 'lc', 'uc'])
    let schema = req.service.get(Schema)
    schema.verify('//trop/front/get_message#/req/query', req.query)

    let message_storage = req.service.get(MessageStorage)
    let items = await message_storage.list({
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
    let auth = req.service.get(Auth)
    await auth.verify(req, ['r', 'rw'])

    let schema = req.service.get(Schema)
    schema.verify('//trop/front/get_message_item#/req/param', req.params)

    let id = uuid.from(req.params.id)
    let message_storage = req.service.get(MessageStorage)
    let item = await message_storage.find(id)
    if (!item) {
        throw new HttpError(404, 'No such message ID')
    } else {
        item._id = uuid.from(item._id).toString()
        res.json(item)
    }
})

router.
post('/', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['w', 'rw'])

    let schema = req.service.get(Schema)
    schema.verify('//trop/front/post_message#/req/body', req.body)

    req.body.ip = get_request_ip(req)
    let message_storage = req.service.get(MessageStorage)
    let id = await message_storage.create(req.body)
    res.status(201).json({
        _id: id.toString()
    })
})

module.exports = router.express
