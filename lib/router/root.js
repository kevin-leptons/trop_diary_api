const {Router} = require('express')

const package = require('../../package')

let router = Router()

let info = {
    name: package.name,
    version: package.version,
    description: package.description
}

router.
get('/', async (req, res) => {
    info.message_count = await req.sv.message_store.count()
    res.json(info)
})

module.exports = router
