const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

describe('patch /account/password', () => {
    let req
    let dflow
    let path = '/account/password'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        let res = await req.patch(path).
        send({
            email: 'root@mail.com',
            old_password: 'goddamnit',
            new_password: 'motherfucker'
        })

        await http_test(res, () => {
            assert.equal(res.status, 204)
            dflow.verify('//trop/front/http_204_res#/body', res.body)
        })
    })

    it('req, put invalid attribute => 400', async () => {
        let res = await req.patch(path).
        send({
            invalid_attribute: 'some value'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, miss email => 400', async () => {
        let res = await req.patch(path).
        send({
            old_password: 'goddamnit',
            new_password: 'motherfucker'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, miss old_password => 400', async () => {
        let res = await req.patch(path).
        send({
            email: 'root@mail.com',
            new_password: 'motherfucker'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, miss new_password => 400', async () => {
        let res = await req.patch(path).
        send({
            email: 'root@mail.com',
            old_password: 'goddamnit'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.verify('//trop/front/http_400_res#/body', res.body)
        })
    })

    it('req, invalid email => 401', async () => {
        let res = await req.patch(path).
        send({
            email: 'lkflksdfjlkj@mail.com',
            old_password: 'goddamnit',
            new_password: 'motherfucker'
        })

        await http_test(res, () => {
            assert.equal(res.status, 401)
            dflow.verify('//trop/front/http_401_res#/body', res.body)
        })
    })

    it('req, invalid old_password => 401', async () => {
        let res = await req.patch(path).
        send({
            email: 'root@mail.com',
            old_password: 'jlkdsjflkasdjflksdj',
            new_password: 'motherfucker'
        })

        await http_test(res, () => {
            assert.equal(res.status, 401)
            dflow.verify('//trop/front/http_401_res#/body', res.body)
        })
    })
})
