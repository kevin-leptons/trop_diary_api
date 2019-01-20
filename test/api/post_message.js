const assert = require('assert')

const box = require('../box')

describe('post /message', () => {
    let req
    let dflow
    let path = '/message'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        res = await req.post(path).
            send({
                level: 'info',
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=debug', async () => {
        res = await req.post(path).
            send({
                level: 'debug',
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=warn', async () => {
        res = await req.post(path).
            send({
                level: 'warn',
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=error', async () => {
        res = await req.post(path).
            send({
                level: 'error',
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req, level=fatal', async () => {
        res = await req.post(path).
            send({
                level: 'fatal',
                message: 'something happens'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_message_res#/body', res.body)
    })

    it('req label=null => 400', async () => {
        res = await req.post(path).
            send({
                level: 'info',
                message: 'something happens',
                label: null
            })
        assert.equal(res.status, 400)
    })

    it('req additional properties => 400', async () => {
        res = await req.post(path).
            send({
                level: 'info',
                message: 'something happens',
                invalid_property: 'oops'
            })
        assert.equal(res.status, 400)
    })
})
