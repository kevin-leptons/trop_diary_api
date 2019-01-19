const assert = require('assert')

const box = require('../box')

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
        res = await req.post(path)
            .send({
                email: 'reader@mail.com',
                password: 'banana',
                role: 'r'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_account_res#/body', res.body)
    })

    it('req role=w', async () => {
        res = await req.post(path)
            .send({
                email: 'writer@mail.com',
                password: 'banana',
                role: 'w'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_account_res#/body', res.body)
    })

    it('req role=rw', async () => {
        res = await req.post(path)
            .send({
                email: 'monitor@mail.com',
                password: 'banana',
                role: 'rw'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_account_res#/body', res.body)
    })

    it('req role=root', async () => {
        res = await req.post(path)
            .send({
                email: 'god@mail.com',
                password: 'banana',
                role: 'root'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_account_res#/body', res.body)
    })

    it('req role=invalid => error', async () => {
        res = await req.post(path)
            .send({
                email: 'reader@mail.com',
                password: 'banana',
                role: 'invalid'
            })
        assert.equal(res.status, 400)
    })

    it('req => error duplicated', async () => {
        res = await req.post(path)
            .send({
                email: 'reader@mail.com',
                password: 'banana',
                role: 'r'
            })
        assert.equal(res.status, 409)
    })
})
