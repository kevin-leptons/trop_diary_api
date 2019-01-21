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

    it('req p=1', async () => {
        res = await req.get(path).
            query({
                p: 1
            })
        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req p=1000', async () => {
        res = await req.get(path).
            query({
                p: 1000
            })
        assert.equal(res.status, 200)
        assert(res.body.length === 0)
    })

    it('req p=0', async () => {
        res = await req.get(path).
            query({
                p: 0
            })
        assert.equal(res.status, 400)
    })

    it('req p=-1', async () => {
        res = await req.get(path).
            query({
                p: -1
            })
        assert.equal(res.status, 400)
    })

    it('req, invlid_param=invalid => error', async () => {
        res = await req.get(path).
            query({
                invalid_param: 'invalid'
            })
        assert.equal(res.status, 400)
    })
})
