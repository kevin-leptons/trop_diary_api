const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

describe('patch /account/role', () => {
    let req
    let dflow
    let path = '/account/role'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        let res = await req.patch(path).
        send({
            email: 'reader@mail.com',
            role: 'rw',
        })

        await http_test(res, () => {
            assert.equal(res.status, 204)
            dflow.verify('//trop/front/http_204_res#/body', res.body)
        })
    })

    it('req, invalid attribute => 400', async () => {
        let res = await req.patch(path).
        send({
            invalid_attribute: 'some value',
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, does not exists email => 400', async () => {
        let res = await req.patch(path).
        send({
            email: 'invalid@mail.com',
            role: 'rw'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, role=invalid => 400', async () => {
        let res = await req.patch(path).
        send({
            email: 'invalid@mail.com',
            role: 'invalid'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })
})
