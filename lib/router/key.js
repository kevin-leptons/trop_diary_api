const Router = require('@trop/async_router')

const {Auth, Schema} = require('../service')

let router = new Router()

router.
post('/', async (req, res) => {
    let auth = req.service.get(Auth)
    await auth.verify(req, ['root'])

    let schema = req.service.get(Schema)
    schema.verify_request('//trop/front/post_key', req)

    let key = await auth.create_token_key(req.body)
    res.status(201).json(key)
})

module.exports = router.express
