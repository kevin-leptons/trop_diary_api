const assert = require('assert')

const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const box = require('../box')
const http_test = require('../http_test')

describe('post /token', () => {
    let req
    let dflow
    let path = '/token'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req create', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com',
            password: 'goddamnit'
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            dflow.raw_verify('//trop/front/post_token#/res/body', res.body)

            let access_token = jwt.decode(res.body.access_token)
            dflow.raw_verify('//trop/front/access_token', access_token)

            req.set_token(res.body.access_token)
            box.set_key('token', res.body)
            box.set_key('access_token', access_token)
        })
    })

    it('req refresh', async () => {
        let old_token = box.get_key('token')
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: old_token.refresh_token
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            dflow.raw_verify('//trop/front/post_token#/res/body', res.body)

            let access_token = jwt.decode(res.body.access_token)
            dflow.raw_verify('//trop/front/access_token', access_token)

            let old_access_token = box.get_key('access_token')
            assert.equal(access_token.role, old_access_token.role)

            req.set_token(res.body.access_token)
            box.set_key('token', res.body)
        })
    })

    it('req, grant_type=invalid => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'invalid'
        })

        await http_test(res, () => {
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req, invalid_attirbute=invalid => 400', async () => {
        let res = await req.post(path, {
            invalid_attribute: 'invalid'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req create, invalid atribute USERNAME => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            USERNAME: 'root@mail.com'
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req create, invalid username => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'invalid@mail.com',
            password: 'oopssssss'
        })

        await http_test(res, () => {
            assert.equal(res.status, 401)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req create, invalid password => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com',
            password: 'oopssssss'
        })

        await http_test(res, () => {
            assert.equal(res.status, 401)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req refresh, invalid atribute REFRESH_TOKEN => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            REFRESH_TOKEN: uuidv4()
        })

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('req refresh => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: uuidv4()
        })

        await http_test(res, () => {
            assert.equal(res.status, 401)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })
})
