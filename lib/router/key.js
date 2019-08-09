const Router = require('@trop/async_router')

const {Auth, Schema} = require('../service')

let router = new Router()

router.
post('/', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['root'])

    let schema = req.service.get(Schema)
    schema.verify('//trop/front/post_key#/req/body', req.body)

    let key = await auth.create_token_key(req.body)
    res.json(key)
})

module.exports = router.express
