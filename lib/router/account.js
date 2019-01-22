const Router = require('@trop/async_router')
const {MongoError} = require('mongodb')

let router = new Router()

router.
get('/', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    if (req.query.p) {
        req.query.p = parseInt(req.query.p)
    }
    req.sv.dflow.verify('//trop/front/get_account_req#/query', req.query)

    let items = await req.sv.account_store.list(req.query.q, req.query.p)
    res.json(items)
})

router.
post('/', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    req.sv.dflow.verify('//trop/front/post_account_req#/body', req.body)

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
    req.sv.dflow.verify(
        '//trop/front/patch_account_password_req#/body',
        req.body
    )

    await req.sv.account_store.change_password(
        req.body.email,
        req.body.old_password,
        req.body.new_password
    )
    res.send()
})

router.
patch('/role', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    req.sv.dflow.verify('//trop/front/patch_account_role_req#/body', req.body)

    await req.sv.account_store.change_role(req.body.email, req.body.role)
    res.send()
})

router.
delete('/item/:username', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    req.sv.dflow.verify('//trop/front/del_account_req#/param', req.params)

    await req.sv.account_store.remove(req.params.username)
    res.send()
})

module.exports = router.express
