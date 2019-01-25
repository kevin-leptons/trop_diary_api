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
            dflow.raw_verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req p=1', async () => {
        let res = await req.get(path, {
            p: 1
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert(res.body.length > 0)
            dflow.raw_verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req p=1000 => empty', async () => {
        let res = await req.get(path, {
            p: 1000
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert.equal(res.body.length, 0)
            dflow.raw_verify('//trop/front/get_account_res#/body', res.body)
        })
    })

    it('req p=one => 400', async () => {
        let res = await req.get(path, {
            p: 'one'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx_res#/body', res.body)
        })
    })

    it('req p=null => 400', async () => {
        let res = await req.get(path, {
            p: null
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx_res#/body', res.body)
        })
    })
})
