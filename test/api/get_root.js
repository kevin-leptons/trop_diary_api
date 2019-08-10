const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://get/', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/'

    before(async () => {
        req = await get_request()
    })

    it('api://get/, ok', async () => {
        let res = await req.get(path)

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_root', res)
        })
    })
})
