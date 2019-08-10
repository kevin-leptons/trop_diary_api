const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://front/post/account', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/account'

    before(async () => {
        req = await get_request()
    })

    it('api://front/post/account, role=r', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'r'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 201)
            schema_service.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('api://front/post/account, role=w', async () => {
        let res = await req.post(path, {
            email: 'writer@mail.com',
            password: 'banana',
            role: 'w'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 201)
            schema_service.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('api://front/post/account, role=rw', async () => {
        let res = await req.post(path, {
            email: 'monitor@mail.com',
            password: 'banana',
            role: 'rw'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 201)
            schema_service.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('api://front/post/account, role=root', async () => {
        let res = await req.post(path, {
            email: 'god@mail.com',
            password: 'banana',
            role: 'root'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 201)
            schema_service.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('api://front/post/account, role=invalid => error', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'invalid'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 400)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/account, error duplicated', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'r'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 409)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })
})
