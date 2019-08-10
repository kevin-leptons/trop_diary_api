const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://delete/account/:username', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/account/item/'

    before(async () => {
        req = await get_request()
    })

    it('api://delete/account/:username, ok', async () => {
        let res = await req.delete(path + 'reader@mail.com')

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_204', res)
        })
    })

    it('api://delete/account/:username, does not exists username => 400', async () => {
        let res = await req.delete(path + 'sdfsadfdsaf@mail.com')

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })
})
