const assert = require('assert')

const box = require('../box')

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
        res = await req.delete(path + 'reader@mail.com')
        assert.equal(res.status, 200)
    })

    it('req, does not exists username => 400', async () => {
        res = await req.delete(path + 'sdfsadfdsaf@mail.com')
        assert.equal(res.status, 400)
    })
})
