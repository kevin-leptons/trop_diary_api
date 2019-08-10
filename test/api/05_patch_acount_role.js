const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://patch/account/role', () => {
    let req
    let schema_service
    let path = '/account/role'

    before(async () => {
        req = await get_request()
        schema_service = get_schema_service()
    })

    it('api://patch/account/role, ok', async () => {
        let res = await req.patch(path, {
            email: 'reader@mail.com',
            role: 'rw',
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_204', res)
        })
    })

    it('api://patch/account/role, invalid attribute => 400', async () => {
        let res = await req.patch(path, {
            invalid_attribute: 'some value',
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://patch/account/role, does not exists email => 400', async () => {
        let res = await req.patch(path, {
            email: 'invalid@mail.com',
            role: 'rw'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://patch/account/role, role=invalid => 400', async () => {
        let res = await req.patch(path, {
            email: 'invalid@mail.com',
            role: 'invalid'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 400)
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })
})
