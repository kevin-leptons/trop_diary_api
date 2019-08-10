const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://post/account', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/account'

    before(async () => {
        req = await get_request()
    })

    it('api://post/account, role=r', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'r'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_account', res)
        })
    })

    it('api://post/account, role=w', async () => {
        let res = await req.post(path, {
            email: 'writer@mail.com',
            password: 'banana',
            role: 'w'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_account', res)
        })
    })

    it('api://post/account, role=rw', async () => {
        let res = await req.post(path, {
            email: 'monitor@mail.com',
            password: 'banana',
            role: 'rw'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_account', res)
        })
    })

    it('api://post/account, role=root', async () => {
        let res = await req.post(path, {
            email: 'god@mail.com',
            password: 'banana',
            role: 'root'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_account', res)
        })
    })

    it('api://post/account, role=invalid => 400', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'invalid'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://post/account, duplicated => 409', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'r'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_409', res)
        })
    })
})
