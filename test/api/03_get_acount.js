const assert = require('assert')

const box = require('../box')

describe('get /account', () => {
    let req
    let dflow
    let path = '/account'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        res = await req.get(path)
        assert.equal(res.status, 200)
        assert(res.body.length > 0)
        dflow.verify('//trop/front/get_account_res#/body', res.body)
    })

    it('req q=root', async () => {
        res = await req.get(path).
        query({
            q: 'root'
        })

        assert.equal(res.status, 200)
        assert(res.body.length > 0)
        dflow.verify('//trop/front/get_account_res#/body', res.body)
    })

    it('req q=root, p=1', async () => {
        res = await req.get(path).
        query({
            q: 'root',
            p: 1
        })

        assert.equal(res.status, 200)
        assert(res.body.length > 0)
        dflow.verify('//trop/front/get_account_res#/body', res.body)
    })

    it('req q=root, p=100 => empty', async () => {
        res = await req.get(path).
        query({
            q: 'root',
            p: 100
        })

        assert.equal(res.status, 200)
        assert(res.body.length === 0)
        dflow.verify('//trop/front/get_account_res#/body', res.body)
    })

    it('req p=one => 400', async () => {
        res = await req.get(path).
        query({
            q: 'root',
            p: 'one'
        })

        assert.equal(res.status, 400)
    })

    it('req q=null => 400', async () => {
        res = await req.get(path).
        query({
            q: null
        })

        assert.equal(res.status, 400)
    })

    it('req p=null => 400', async () => {
        res = await req.get(path).
        query({
            q: 'root',
            p: null
        })

        assert.equal(res.status, 400)
    })
})
