const assert = require('assert')
const uuid = require('uuid-mongodb')

const {get_request, get_schema_service} = require('../lib')

describe('api://', () => {
    let req
    let schema_service = get_schema_service()

    before(async () => {
        let http_req = await get_request()
        req = http_req.raw
    })

    it('api://post/message, content-type=text => 415', async () => {
        let res = await req.post('/message').
        set('content-type', 'text')

        schema_service.verify_response('//trop/front/http_415', res)
    })

    it('api://post/message, accept=text => 406', async () => {
        let res = await req.post('/message', {}).
        set('content-type', 'application/json').
        set('accept', 'text')

        schema_service.verify_response('//trop/front/http_406', res)
    })

    it('api://get/does_not_exists_resource => 404', async () => {
        let path = '/' + uuid.v4().toString()
        let res = await req.get(path)

        schema_service.verify_response('//trop/front/http_404', res)
    })
})
