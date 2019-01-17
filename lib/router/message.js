const Router = require('@trop/async_router')

let router = new Router()

router.
post('/', async (req, res) => {
    let id = await req.sv.message_store.create(req.body)

    res.json({
        id: id
    })
})

router.
get('/', async (req, res) => {
    let items = await req.sv.message_store.find()

    res.json(items)
})

module.exports = router.express
