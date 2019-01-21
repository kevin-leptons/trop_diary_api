const assert = require('assert')

const {ObjectId} = require('mongodb')

const box = require('../box')

describe('get /message/item/:id', () => {
    let req
    let dflow
    let get_key
    let path = '/message/item/'

    before(async () => {
        req = await box.request()
        get_key = box.get_key

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        res = await req.get(path + get_key('message_id'))

        assert.equal(res.status, 200)
        dflow.verify('//trop/front/get_message_item_res#/body', res.body)
    })

    it('req, id=does not exist ID => 404', async () => {
        res = await req.get(path + ObjectId().toString())

        assert.equal(res.status, 404)
    })

    it('req, id=invalid object ID => 400', async () => {
        res = await req.get(path + 'just string')

        assert.equal(res.status, 400)
    })
})
