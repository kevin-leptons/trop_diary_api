const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://patch/account/password', () => {
    let req
    let schema_service
    let path = '/account/password'

    before(async () => {
        req = await get_request()
        schema_service = get_schema_service()
    })

    it('api://patch/account/password, ok', async () => {
        let res = await req.patch(path, {
            email: 'root@mail.com',
            old_password: 'goddamnit',
            new_password: 'motherfucker'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_204', res)
        })
    })

    it('api://patch/account/password, invalid attribute => 400', async () => {
        let res = await req.patch(path, {
            invalid_attribute: 'some value'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://patch/account/password, miss email => 400', async () => {
        let res = await req.patch(path, {
            old_password: 'goddamnit',
            new_password: 'motherfucker'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://patch/account/password, miss old_password => 400', async () => {
        let res = await req.patch(path, {
            email: 'root@mail.com',
            new_password: 'motherfucker'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://patch/account/password, miss new_password => 400', async () => {
        let res = await req.patch(path, {
            email: 'root@mail.com',
            old_password: 'goddamnit'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://patch/account/password, invalid email => 401', async () => {
        let res = await req.patch(path, {
            email: 'lkflksdfjlkj@mail.com',
            old_password: 'goddamnit',
            new_password: 'motherfucker'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_401', res)
        })
    })

    it('api://patch/account/password, invalid old_password => 401', async () => {
        let res = await req.patch(path, {
            email: 'root@mail.com',
            old_password: 'jlkdsjflkasdjflksdj',
            new_password: 'motherfucker'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_401', res)
        })
    })
})
