const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

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
        let res = await req.get(path)

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert(res.body.length > 0)
            dflow.verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req q=root', async () => {
        let res = await req.get(path).
        query({
            q: 'root'
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert(res.body.length > 0)
            dflow.verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req q=root, p=1', async () => {
        let res = await req.get(path).
        query({
            q: 'root',
            p: 1
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert(res.body.length > 0)
            dflow.verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req q=root, p=100 => empty', async () => {
        let res = await req.get(path).
        query({
            q: 'root',
            p: 100
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert.equal(res.body.length, 0)
            dflow.verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req p=one => 400', async () => {
        let res = await req.get(path).
        query({
            q: 'root',
            p: 'one'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
        })
    })

    it('req q=null => 400', async () => {
        let res = await req.get(path).
        query({
            q: null
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
        })
    })

    it('req p=null => 400', async () => {
        let res = await req.get(path).
        query({
            q: 'root',
            p: null
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
        })
    })
})
