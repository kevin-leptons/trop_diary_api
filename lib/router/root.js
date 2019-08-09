const path = require('path')
const fs = require('fs')
const Router = require('@trop/async_router')

const {MessageStorage} = require('../service')

const info = _get_package_info()

let router = new Router()

router.
get('/', async (req, res) => {
    let message_storage = req.service.get(MessageStorage)

    info.message_count = await message_storage.count()
    res.json(info)
})

module.exports = router.express

// private members

function _get_package_info() {
    let file = path.join(__dirname, '..', '..', 'package.json')
    let data = fs.readFileSync(file)
    let raw = JSON.parse(data)
    let info = {
        name: raw.name,
        version: raw.version,
        description: raw.description
    }

    return info
}
