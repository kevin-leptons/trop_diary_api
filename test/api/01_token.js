const assert = require('assert')

const jwt = require('jsonwebtoken')

const box = require('../box')

describe('post /token', () => {
    let req
    let dflow
    let path = '/token'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        res = await req.post(path)
            .send({
                email: 'root@mail.com',
                password: 'goddamnit'
            })

        assert.equal(res.status, 200)
        dflow.verify('//trop/front/post_token_res#/body', res.body)

        let token = jwt.decode(res.body.token)
        dflow.verify('//trop/front/token', token)
        req.set_token(res.body.token)
    })

    it('req => 401', async () => {
        res = await req.post(path)
            .send({
                email: 'root@mail.com',
                password: 'oopssssss'
            })
        assert.equal(res.status, 401)
    })
})
