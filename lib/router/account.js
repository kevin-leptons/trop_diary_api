const Router = require('@trop/async_router')

let router = new Router()

router.
post('/', async (req, res) => {
    try {
        req.sv.dflow.verify('//trop/front/post_account_req#/body', req.body)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    let id = await req.sv.account_store.create(
        req.body.email,
        req.body.password,
        req.body.role
    )
    res.json({
        _id: id
    })
})

module.exports = router.express
