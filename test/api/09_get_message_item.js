const assert = require('assert')
const uuid = require('uuid-mongodb')

const {
    get_request,
    get_schema_service,
    http_assert,
    global_value
} = require('../lib')

describe('api://get/message/item/:id', () => {
    let req
    let schema_service = get_schema_service()
    let path = '/message/item/'

    before(async () => {
        req = await get_request()
    })

    it('api://get/message/item/:id, ok', async () => {
        let res = await req.get(path + global_value.get('message_id'))

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/get_message_item', res)
        })
    })

    it('api://get/message/item/:id, id=does not exist ID => 404', async () => {
        let res = await req.get(path + uuid.v4().toString())

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_404', res)
        })
    })

    it('api://get/message/item/:id, id=invalid object ID => 400', async () => {
        let res = await req.get(path + 'just string')

        await http_assert(res, () => {
            schema_service.verify_response('//trop/front/http_400', res)
        })
    })
})
