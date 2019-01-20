const assert = require('assert')

const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const box = require('../box')

describe('post /token', () => {
    let req
    let dflow
    let old_token
    let path = '/token'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req create', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'password',
                username: 'root@mail.com',
                password: 'goddamnit'
            })

        assert.equal(res.status, 200)
        dflow.verify('//trop/front/post_token_res#/body', res.body)

        let access_token = jwt.decode(res.body.access_token)
        dflow.verify('//trop/front/access_token', access_token)
        req.set_token(res.body.access_token)
        old_token = res.body
    })

    it('req refresh', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'refresh_token',
                refresh_token: old_token.refresh_token
            })

        assert.equal(res.status, 200)
        dflow.verify('//trop/front/post_token_res#/body', res.body)

        let token = jwt.decode(res.body.access_token)
        dflow.verify('//trop/front/access_token', token)
        req.set_token(res.body.access_token)
        old_token = res.body
    })

    it('req, grant_type=invalid => 400', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'invalid'
            })
        assert.equal(res.status, 400)
    })

    it('req, invalid_attirbute=invalid => 400', async () => {
        res = await req.post(path)
            .send({
                invalid_attribute: 'invalid'
            })
        assert.equal(res.status, 400)
    })

    it('req create, invalid atribute USERNAME => 400', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'password',
                USERNAME: 'root@mail.com'
            })
        assert.equal(res.status, 400)
    })

    it('req create, invalid username => 401', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'password',
                username: 'invalid@mail.com',
                password: 'oopssssss'
            })
        assert.equal(res.status, 401)
    })

    it('req create, invalid password => 401', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'password',
                username: 'root@mail.com',
                password: 'oopssssss'
            })
        assert.equal(res.status, 401)
    })

    it('req refresh, invalid atribute REFRESH_TOKEN => 400', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'refresh_token',
                REFRESH_TOKEN: uuidv4()
            })
        assert.equal(res.status, 400)
    })

    it('req refresh => 401', async () => {
        res = await req.post(path)
            .send({
                grant_type: 'refresh_token',
                refresh_token: uuidv4()
            })
        assert.equal(res.status, 401)
    })
})
