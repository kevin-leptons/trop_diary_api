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

    it('req', async () => {
        res = await req.post(path)
            .send({
                email: 'god@mail.com',
                password: 'banana',
                role: 'rw'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_account_res#/body', res.body)
    })

    it('req => error', async () => {
        res = await req.post(path)
            .send({
                email: 'god@mail.com',
                password: 'banana',
                role: 'rw'
            })
        assert.equal(res.status, 409)
    })
})
