const assert = require('assert')

const box = require('../box')
const http_test = require('../http_test')

describe('delete /account/:username', () => {
    let req
    let dflow
    let path = '/account/item/'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        let res = await req.delete(path + 'reader@mail.com')

        await http_test(res, () => {
            assert.equal(res.status, 204)
            dflow.raw_verify('//trop/front/http_204#/res/body', res.body)
        })
    })

    it('req, does not exists username => 400', async () => {
        let res = await req.delete(path + 'sdfsadfdsaf@mail.com')

        await http_test(res, () => {
            assert.equal(res.status, 400)
            dflow.raw_verify('//trop/front/http_4xx#/res/body', res.body)
        })
    })
})
