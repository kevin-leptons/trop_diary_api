const Router = require('@trop/async_router')
const uuid = require('uuid-mongodb')
const {MongoError} = require('mongodb')

const {HttpError} = require('../error')
const {parse_query_int} = require('../util')
const {
    Schema,
    Auth,
    AccountStorage
} = require('../service')

let router = new Router()

router.
get('/', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['root'])

    parse_query_int(req.query, ['p'])
    let schema = req.service.get(Schema)
    schema.verify('//trop/front/get_account#/req/query', req.query)

    let account_storage = req.service.get(AccountStorage)
    let items = await account_storage.list(req.query.q, req.query.p)
    for (let item of items) {
        item._id = uuid.from(item._id).toString()
    }
    res.json(items)
})

router.
post('/', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['root'])

    let schema = req.service.get(Schema)
    schema.verify('//trop/front/post_account#/req/body', req.body)

    let account_storage = req.service.get(AccountStorage)
    try {
        let id = await account_storage.create(
            req.body.email,
            req.body.password,
            req.body.role
        )
        res.status(201).json({
            _id: uuid.from(id).toString()
        })
    } catch (e) {
        if (e instanceof MongoError && e.code === 11000) {
            let http_err = new HttpError(409, undefined, e, {
                name: 'email'
            })
        }

        throw e
    }
})

router.
patch('/password', async (req, res) => {
    req.accepts('application/json')
    let schema = req.service.get(Schema)
    schema.verify(
        '//trop/front/patch_account_password#/req/body',
        req.body
    )

    let account_storage = req.service.get(AccountStorage)
    await account_storage.change_password(
        req.body.email,
        req.body.old_password,
        req.body.new_password
    )
    res.status(204).send()
})

router.
patch('/role', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['root'])

    let schema = req.service.get(Schema)
    schema.verify('//trop/front/patch_account_role#/req/body', req.body)

    let account_storage = req.service.get(AccountStorage)
    await account_storage.change_role(req.body.email, req.body.role)
    res.status(204).send()
})

router.
delete('/item/:username', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['root'])

    let schema = req.service.get(Schema)
    schema.verify('//trop/front/del_account#/req/param', req.params)

    let account_storage = req.service.get(AccountStorage)
    await account_storage.remove(req.params.username)
    res.status(204).send()
})

module.exports = router.express
