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
