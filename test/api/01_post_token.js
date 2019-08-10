const assert = require('assert')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://front/post/token', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/token'

    before(async () => {
        req = await get_request()
    })

    it('api://front/post/token#password', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com',
            password: 'goddamnit'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 200)
            schema_service.raw_verify('//trop/front/post_token#/res/body', res.body)

            let access_token = jwt.decode(res.body.access_token)
            schema_service.raw_verify('//trop/front/access_token', access_token)

            req.set_token(res.body.access_token)
            global_value.set('token', res.body)
            global_value.set('access_token', access_token)
        })
    })

    it('api://front/post/token#refresh_token', async () => {
        let old_token = global_value.get('token')
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: old_token.refresh_token
        })

        await http_assert(res, () => {
            assert.equal(res.status, 200)
            schema_service.raw_verify('//trop/front/post_token#/res/body', res.body)

            let access_token = jwt.decode(res.body.access_token)
            schema_service.raw_verify('//trop/front/access_token', access_token)

            let old_access_token = global_value.get('access_token')
            assert.equal(access_token.role, old_access_token.role)

            req.set_token(res.body.access_token)
            global_value.set('token', res.body)
        })
    })

    it('api://front/post/token, grant_type=invalid => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'invalid'
        })

        await http_assert(res, () => {
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/token, invalid_attirbute=invalid => 400', async () => {
        let res = await req.post(path, {
            invalid_attribute: 'invalid'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 400)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/token#password, invalid atribute username => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 400)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/token#password, invalid username => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'invalid@mail.com',
            password: 'oopssssss'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 401)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/token#password, invalid password => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com',
            password: 'oopssssss'
        })

        await http_assert(res, () => {
            assert.equal(res.status, 401)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/token#refresh_token, invalid atribute refresh_token => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: uuidv4()
        })

        await http_assert(res, () => {
            assert.equal(res.status, 401)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })

    it('api://front/post/token#refresh_token, invalid refresh_token => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: uuidv4()
        })

        await http_assert(res, () => {
            assert.equal(res.status, 401)
            schema_service.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })
})
