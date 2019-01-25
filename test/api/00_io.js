const assert = require('assert')

const uuid = require('uuid-mongodb')

const box = require('../box')

describe('io data', () => {
    let req
    let dflow

    before(async () => {
        let http_req = await box.request()
        req = http_req.raw

        let service = await box.service()
        dflow = service.dflow
    })

    it('post /message, content-type=text  => 415', async () => {
        let res = await req.post('/message').
        set('content-type', 'text').
        expect(415)

        dflow.verify('//trop/front/http_4xx_res#/body', res.body)
    })

    it('post /message, accept=text => 406', async () => {
        let res = await req.post('/message', {}).
        set('content-type', 'application/json').
        set('accept', 'text').
        expect(406)

        dflow.verify('//trop/front/http_4xx_res#/body', res.body)
    })

    it('get /does_not_exists_resource => 404', async () => {
        let path = uuid.v4().toString()
        let res = await req.get('/' + path).
        expect(404)

        dflow.verify('//trop/front/http_4xx_res#/body', res.body)
    })
})
