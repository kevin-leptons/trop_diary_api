const assert = require('assert')

const box = require('../box')

describe('get /message', () => {
    let req
    let dflow
    let path = '/message'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        res = await req.get(path)
        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req q=hello', async () => {
        res = await req.get(path).
            query({
                q: 'hello'
            })
        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req q=hello, p=2', async () => {
        res = await req.get(path).
            query({
                q: 'hello',
                p: 2
            })
        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req q=hello, p=2, s=8', async () => {
        res = await req.get(path).
            query({
                q: 'hello',
                p: 2,
                s: 8
            })
        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req invalid pram => error', async () => {
        res = await req.get(path).
            query({
                invalid_param: 'oops'
            })
        assert.equal(res.status, 400)
    })
})
