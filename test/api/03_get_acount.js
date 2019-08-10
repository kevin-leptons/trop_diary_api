const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://get/account', () => {
    let req
    let schema_service
    let path = '/account'

    before(async () => {
        req = await get_request()
        schema_service = get_schema_service()
    })

    it('api://get/account, ok', async () => {
        let res = await req.get(path)

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_account', res)
            assert(res.body.length > 0)
        })
    })

    it('api://get/account, p=1', async () => {
        let res = await req.get(path, {
            p: 1
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_account', res)
            assert(res.body.length > 0)
        })
    })

    it('api://get/account, p=1000 => empty', async () => {
        let res = await req.get(path, {
            p: 1000
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_account', res)
            assert.equal(res.body.length, 0)
        })
    })

    it('api://get/account, p=one => 400', async () => {
        let res = await req.get(path, {
            p: 'one'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://get/account, p=null => 400', async () => {
        let res = await req.get(path, {
            p: null
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })
})
