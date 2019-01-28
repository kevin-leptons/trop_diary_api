const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

describe('get /', () => {
    let req
    let dflow
    let path = '/'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        let res = await req.get(path)

        await http_test(res, () => {
            assert.equal(res.status, 200)
            dflow.raw_verify('//trop/front/get_root#/res/body', res.body)
        })
    })
})
