const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://get/message', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/message'

    before(async () => {
        req = await get_request()
    })

    it('api://get/message, ok', async () => {
        let res = await req.get(path)

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
        })
    })

    it('api://get/message, ll=1, ul=2', async () => {
        let res = await req.get(path, {
            ll: 1,
            ul: 2
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)

            assert(res.body.length === 2)
            for (let item of res.body) {
                assert(item.level >= 1)
                assert(item.level <= 2)
            }
        })
    })

    it('api://get/message, lc=today, uc=today', async () => {
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

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
            assert.equal(res.body.length, 6)
        })
    })

    it('api://get/message, uc=previous day', async () => {
        let d = new Date()
        d.setDate(d.getDate() - 1)
        let prev_day = Math.floor(d.getTime() / 1000)

        let res = await req.get(path, {
            uc: prev_day
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
            assert.equal(res.body.length, 0)
        })
    })

    it('api://get/message, lc=next day', async () => {
        let d = new Date()
        d.setDate(d.getDate() + 1)
        let next_day = Math.floor(d.getTime() / 1000)

        let res = await req.get(path, {
            lc: next_day
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
            assert.equal(res.body.length, 0)
        })
    })

    it('api://get/message, l=api', async () => {
        let res = await req.get(path, {
            l: 'api'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
            assert.notEqual(res.body.length, 0)
        })
    })

    it('api://get/message, l=does_not_exist', async () => {
        let res = await req.get(path, {
            l: 'does_not_exist'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
            assert.equal(res.body.length, 0)
        })
    })

    it('api://get/message, p=1', async () => {
        let res = await req.get(path, {
            p: 1
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
        })
    })

    it('api://get/message, p=1000', async () => {
        let res = await req.get(path, {
            p: 1000
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
            assert.equal(res.body.length, 0)
        })
    })

    it('api://get/message, p=0', async () => {
        let res = await req.get(path, {
            p: 0
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://get/message, p=-1', async () => {
        let res = await req.get(path, {
            p: -1
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://get/message, invlid_param=invalid => error', async () => {
        let res = await req.get(path, {
            invalid_param: 'invalid'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })
})
