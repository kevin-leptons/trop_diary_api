const Router = require('@trop/async_router')

let router = new Router()

router.
post('/', async (req, res) => {
    await req.sv.auth.verify(req, ['root'])

    req.sv.dflow.verify('//trop/front/post_key#/req/body', req.body)

    let key = await req.sv.auth.create_token_key(req.body)
    res.json(key)
})

module.exports = router.express
