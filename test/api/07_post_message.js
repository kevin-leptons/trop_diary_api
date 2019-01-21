const assert = require('assert')

const box = require('../box')

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
        res = await req.post(path).
            send({
                level: 0,
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
        set_key('message_id', res.body._id)
    })

    it('req, level=debug', async () => {
        res = await req.post(path).
            send({
                level: 1,
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=warn', async () => {
        res = await req.post(path).
            send({
                level: 2,
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=error', async () => {
        res = await req.post(path).
            send({
                level: 3,
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=fatal', async () => {
        res = await req.post(path).
            send({
                level: 4,
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req label=api', async () => {
        res = await req.post(path).
            send({
                level: 0,
                message: 'something happens',
                label: 'api'
            })

        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req label=null => 400', async () => {
        res = await req.post(path).
            send({
                level: 0,
                message: 'something happens',
                label: null
            })

        assert.equal(res.status, 400)
    })

    it('req, invalid_property=invalid => 400', async () => {
        res = await req.post(path).
            send({
                level: 0,
                message: 'something happens',
                invalid_property: 'invalid'
            })
        assert.equal(res.status, 400)
    })
})
