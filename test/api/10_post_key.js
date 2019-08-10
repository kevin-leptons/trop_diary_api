const assert = require('assert')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://post/key', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/key'

    before(async () => {
        req = await get_request()
    })

    it('api://post/key, ok', async () => {
        let res = await req.post(path, {
            role: 'r',
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_key', res)

            let access_token = jwt.decode(res.body.access_token)
            schema_service.verify('//trop/front/access_token_key', access_token)
            req.set_token_key(res.body.access_token)
        })
    })

    it('api://post/key, /message to verify key just granted', async () => {
        let res = await req.get('/message')

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message', res)
        })
    })
})
