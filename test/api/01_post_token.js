const assert = require('assert')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://post/token', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/token'

    before(async () => {
        req = await get_request()
    })

    it('api://post/token#password', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com',
            password: 'goddamnit'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_token', res)

            let access_token = jwt.decode(res.body.access_token)
            schema_service.verify('//trop/front/access_token', access_token)

            req.set_token(res.body.access_token)
            global_value.set('token', res.body)
            global_value.set('access_token', access_token)
        })
    })

    it('api://post/token#refresh_token', async () => {
        let old_token = global_value.get('token')
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: old_token.refresh_token
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_token', res)

            let access_token = jwt.decode(res.body.access_token)
            schema_service.verify('//trop/front/access_token', access_token)

            let old_access_token = global_value.get('access_token')
            assert.equal(access_token.role, old_access_token.role)

            req.set_token(res.body.access_token)
            global_value.set('token', res.body)
        })
    })

    it('api://post/token, grant_type=invalid => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'invalid'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://post/token, invalid_attirbute=invalid => 400', async () => {
        let res = await req.post(path, {
            invalid_attribute: 'invalid'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://post/token#password, invalid atribute username => 400', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://post/token#password, invalid username => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'invalid@mail.com',
            password: 'oopssssss'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_401', res)
        })
    })

    it('api://post/token#password, invalid password => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'password',
            username: 'root@mail.com',
            password: 'oopssssss'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_401', res)
        })
    })

    it('api://post/token#refresh_token, invalid refresh_token => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: uuidv4()
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_401', res)
        })
    })

    it('api://post/token#refresh_token, invalid refresh_token => 401', async () => {
        let res = await req.post(path, {
            grant_type: 'refresh_token',
            refresh_token: uuidv4()
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_401', res)
        })
    })
})
