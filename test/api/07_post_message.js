const assert = require('assert')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://post/message', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/message'

    before(async () => {
        req = await get_request()
    })

    it('api://post/message, level=info', async () => {
        let res = await req.post(path, {
            level: 0,
            data: 'something happens'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_message', res)
            global_value.set('message_id', res.body._id)
        })
    })

    it('api://post/message, level=debug', async () => {
        let res = await req.post(path, {
            level: 1,
            data: 'something happens'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_message', res)
        })
    })

    it('api://post/message, level=warn', async () => {
        let res = await req.post(path, {
            level: 2,
            data: 'something happens'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_message', res)
        })
    })

    it('api://post/message, level=error', async () => {
        let res = await req.post(path, {
            level: 3,
            data: 'something happens'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_message', res)
        })
    })

    it('api://post/message, level=fatal', async () => {
        let res = await req.post(path, {
            level: 4,
            data: 'something happens'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_message', res)
        })
    })

    it('api://post/message, label=api', async () => {
        let res = await req.post(path, {
            level: 0,
            data: 'something happens',
            label: 'api'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/post_message', res)
        })
    })

    it('api://post/message, label=null => 400', async () => {
        let res = await req.post(path, {
            level: 0,
            data: 'something happens',
            label: null
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })

    it('api://post/message, invalid_property=invalid => 400', async () => {
        let res = await req.post(path, {
            level: 0,
            data: 'something happens',
            invalid_property: 'invalid'
        })

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })
})
