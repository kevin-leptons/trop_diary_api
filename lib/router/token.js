const Router = require('@trop/async_router')

let router = new Router()

router.
post('/', async (req, res) => {
    req.sv.dflow.verify('//trop/front/post_token_req#/body', req.body)

    let token = await req.sv.auth.create_token(req.body)
    res.json(token)
})

module.exports = router.express
