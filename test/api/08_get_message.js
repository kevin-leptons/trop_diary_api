const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

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
        let res = await req.get(path)

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            dflow.verify('//trop/front/get_message_res#/body', res.body)
        })
    })

    it('req, ll=1, ul=2', async () => {
        let res = await req.get(path, {
            ll: 1,
            ul: 2
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            dflow.verify('//trop/front/get_message_res#/body', res.body)

            assert(res.body.length === 2)
            for (let item of res.body) {
                assert(item.level >= 1)
                assert(item.level <= 2)
            }
        })
    })

    it('req lc=today, uc=today', async () => {
        let d = new Date()
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        let today_start = Math.floor(d.getTime() / 1000)
        d.setDate(d.getDate() + 1)
        let today_end = Math.floor(d.getTime() / 1000)

        let res = await req.get(path, {
            lc: today_start,
            uc: today_end
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert.equal(res.body.length, 6)
            dflow.verify('//trop/front/get_message_res#/body', res.body)
        })
    })

    it('req uc=previous day', async () => {
        let d = new Date()
        d.setDate(d.getDate() - 1)
        let prev_day = Math.floor(d.getTime() / 1000)

        let res = await req.get(path, {
            uc: prev_day
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert.equal(res.body.length, 0)
        })
    })

    it('req lc=next day', async () => {
        let d = new Date()
        d.setDate(d.getDate() + 1)
        let next_day = Math.floor(d.getTime() / 1000)

        let res = await req.get(path, {
            lc: next_day
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert.equal(res.body.length, 0)
        })
    })

    it('req l=api', async () => {
        let res = await req.get(path, {
            l: 'api'
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert.notEqual(res.body.length, 0)
            dflow.verify('//trop/front/get_message_res#/body', res.body)
        })
    })

    it('req l=does_not_exist', async () => {
        let res = await req.get(path, {
            l: 'does_not_exist'
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert(res.body.length === 0)
        })
    })

    it('req p=1', async () => {
        let res = await req.get(path, {
            p: 1
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            dflow.verify('//trop/front/get_message_res#/body', res.body)
        })
    })

    it('req p=1000', async () => {
        let res = await req.get(path, {
            p: 1000
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            assert(res.body.length === 0)
        })
    })

    it('req p=0', async () => {
        let res = await req.get(path, {
            p: 0
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req p=-1', async () => {
        let res = await req.get(path, {
            p: -1
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, invlid_param=invalid => error', async () => {
        let res = await req.get(path, {
            invalid_param: 'invalid'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })
})
