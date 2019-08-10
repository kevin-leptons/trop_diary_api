const Router = require('@trop/async_router')

const {Schema, Auth} = require('../service')

let router = new Router()

router.
post('/', async (req, res) => {
    let schema = req.service.get(Schema)
    schema.verify_request('//trop/front/post_token', req)

    let auth = req.service.get(Auth)
    let token = await auth.create_token(req.body)
    res.status(201).json(token)
})

module.exports = router.express
