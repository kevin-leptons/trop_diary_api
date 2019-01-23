const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

describe('post /message', () => {
    let req
    let dflow
    let set_key
    let path = '/message'

    before(async () => {
        set_key = box.set_key
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req, level=info', async () => {
        let res = await req.post(path, {
            level: 0,
            message: 'something happens'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.verify('//trop/front/post_message_res#/body', res.body)
            set_key('message_id', res.body._id)
        })
    })

    it('req, level=debug', async () => {
        let res = await req.post(path, {
            level: 1,
            message: 'something happens'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.verify('//trop/front/post_message_res#/body', res.body)
        })
    })

    it('req, level=warn', async () => {
        let res = await req.post(path, {
            level: 2,
            message: 'something happens'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.verify('//trop/front/post_message_res#/body', res.body)
        })
    })

    it('req, level=error', async () => {
        let res = await req.post(path, {
            level: 3,
            message: 'something happens'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.verify('//trop/front/post_message_res#/body', res.body)
        })
    })

    it('req, level=fatal', async () => {
        let res = await req.post(path, {
            level: 4,
            message: 'something happens'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.verify('//trop/front/post_message_res#/body', res.body)
        })
    })

    it('req label=api', async () => {
        let res = await req.post(path, {
            level: 0,
            message: 'something happens',
            label: 'api'
        })

        await http_test(res, () => {
            assert.equal(res.status, 201)
            dflow.verify('//trop/front/post_message_res#/body', res.body)
        })
    })

    it('req label=null => 400', async () => {
        let res = await req.post(path, {
            level: 0,
            message: 'something happens',
            label: null
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, invalid_property=invalid => 400', async () => {
        let res = await req.post(path, {
            level: 0,
            message: 'something happens',
            invalid_property: 'invalid'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })
})
