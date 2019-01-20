const Router = require('@trop/async_router')
const {MongoError} = require('mongodb')

let router = new Router()

router.
get('/', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    try {
        if (req.query.p) {
            req.query.p = parseInt(req.query.p)
        }

        req.sv.dflow.verify('//trop/front/get_account_req#/query', req.query)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    let items = await req.sv.account_store.list(req.query.q, req.query.p)
    res.json(items)
})

router.
post('/', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    try {
        req.sv.dflow.verify('//trop/front/post_account_req#/body', req.body)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    try {
        let id = await req.sv.account_store.create(
            req.body.email,
            req.body.password,
            req.body.role
        )
        res.status(201).json({
            _id: id
        })
    } catch (e) {
        if (e instanceof MongoError && e.code === 11000) {
            res.status(409).json({
                error: 'Existed email'
            })
            return
        }

        throw e
    }
})

router.
patch('/password', async (req, res) => {
    try {
        req.sv.dflow.verify(
            '//trop/front/patch_account_password_req#/body',
            req.body
        )
    } catch (e) {
        res.status(400).send(e)
        return
    }

    await req.sv.account_store.change_password(
        req.body.email,
        req.body.old_password,
        req.body.new_password
    )
    res.json({})
})

module.exports = router.express
