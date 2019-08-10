const assert = require('assert')
const uuid = require('uuid-mongodb')

const {get_request, get_schema_service} = require('../lib')

describe('api://front', () => {
    let req
    let schema_service

    before(async () => {
        let http_req = await get_request()
        req = http_req.raw

        schema_service = get_schema_service()
    })

    it('post /message, content-type=text  => 415', async () => {
        let res = await req.post('/message').
        set('content-type', 'text').
        expect(415)

        schema_service.verify('//trop/front/http_4xx#/res/body', res.body)
    })

    it('post /message, accept=text => 406', async () => {
        let res = await req.post('/message', {}).
        set('content-type', 'application/json').
        set('accept', 'text').
        expect(406)

        schema_service.verify('//trop/front/http_4xx#/res/body', res.body)
    })

    it('get /does_not_exists_resource => 404', async () => {
        let path = uuid.v4().toString()
        let res = await req.get('/' + path).
        expect(404)

        schema_service.verify('//trop/front/http_4xx#/res/body', res.body)
    })
})
