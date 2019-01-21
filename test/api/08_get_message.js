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

    it('req ld=today, ud=today', async () => {
        let d = new Date()
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        let today_start = Math.floor(d.getTime() / 1000)
        d.setDate(d.getDate() + 1)
        let today_end = Math.floor(d.getTime() / 1000)

        res = await req.get(path).
        query({
            ld: today_start,
            ud: today_end
        })

        assert.equal(res.status, 200)
        assert.equal(res.body.length, 6)
        dflow.verify('//trop/front/get_message_res#/body', res.body)
    })

    it('req ud=previous day', async () => {
        let d = new Date()
        d.setDate(d.getDate() - 1)
        let prev_day = Math.floor(d.getTime() / 1000)

        res = await req.get(path).
        query({
            ud: prev_day 
        })

        assert.equal(res.status, 200)
        assert.equal(res.body.length, 0)
    })

    it('req ld=next day', async () => {
        let d = new Date()
        d.setDate(d.getDate() + 1)
        let next_day = Math.floor(d.getTime() / 1000)

        res = await req.get(path).
        query({
            ld: next_day
        })

        assert.equal(res.status, 200)
        assert.equal(res.body.length, 0)
    })

    it('req l=api', async () => {
        res = await req.get(path).
        query({
            l: 'api'
        })

        assert.equal(res.status, 200)
        assert.notEqual(res.body.length, 0)
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
