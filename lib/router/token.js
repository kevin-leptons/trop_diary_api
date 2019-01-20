const Router = require('@trop/async_router')

let router = new Router()

router.
post('/', async (req, res) => {
    try {
        req.sv.dflow.verify('//trop/front/post_token_req#/body', req.body)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    let token = await req.sv.auth.create_token(req.body)
    res.json(token)
})

module.exports = router.express
