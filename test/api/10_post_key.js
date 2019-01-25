const assert = require('assert')

const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const box = require('../box')
const http_test = require('../http_test')

describe('post /key', () => {
    let req
    let dflow
    let path = '/key'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        let res = await req.post(path, {
            role: 'r',
        })

        await http_test(res, () => {
            assert.equal(res.status, 200)
            dflow.raw_verify('//trop/front/post_key_res#/body', res.body)

            let access_token = jwt.decode(res.body.access_token)
            dflow.raw_verify('//trop/front/access_token_key', access_token)
            req.set_token_key(res.body.access_token)
        })
    })

    it('get /message to verify key just granted', async () => {
        let res = await req.get('/message')

        await http_test(res, () => {
            assert.equal(res.status, 200)
            assert(res.body instanceof Array)
            dflow.raw_verify('//trop/front/get_message_res#/body', res.body)
        })
    })
})
