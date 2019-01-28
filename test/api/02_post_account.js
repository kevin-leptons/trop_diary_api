const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

describe('post /account', () => {
    let req
    let dflow
    let path = '/account'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req role=r', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'r'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('req role=w', async () => {
        let res = await req.post(path, {
            email: 'writer@mail.com',
            password: 'banana',
            role: 'w'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('req role=rw', async () => {
        let res = await req.post(path, {
            email: 'monitor@mail.com',
            password: 'banana',
            role: 'rw'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('req role=root', async () => {
        let res = await req.post(path, {
            email: 'god@mail.com',
            password: 'banana',
            role: 'root'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.raw_verify('//trop/front/post_account#/res/body', res.body)
        })
    })

    it('req role=invalid => error', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'invalid'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req => error duplicated', async () => {
        let res = await req.post(path, {
            email: 'reader@mail.com',
            password: 'banana',
            role: 'r'
        })

        await http_test(res, () => {
            assert.equal(res.status, 409)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })
})
