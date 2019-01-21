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

    it('req, ll=1, ul=2', async () => {
        res = await req.get(path).
        query({
            ll: 1,
            ul: 2
        })

        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_res#/body', res.body)

        assert(res.body.length === 2)
        for (let item of res.body) {
            assert(item.level >= 1)
            assert(item.level <= 2)
        }
    })

    it('req l=api', async () => {
        res = await req.get(path).
        query({
            l: 'api'
        })

        assert.equal(res.status, 200)
        assert(res.body.length !== 0)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req l=does_not_exist', async () => {
        res = await req.get(path).
        query({
            l: 'does_not_exist'
        })

        assert.equal(res.status, 200)
        assert(res.body.length === 0)
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
