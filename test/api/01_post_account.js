const assert = require('assert')

const box = require('../box')

describe('post /account', () => {
    let req
    let dflow
    let path = '/account'

    before(async () => {
        req = await box.request()

        let service = await box.service()
        dflow = service.dflow
    })

    it('req', async () => {
        res = await req.post(path)
            .send({
                email: 'root@mail.com',
                password: 'banana',
                role: 'root'
            })
        assert.equal(res.status, 201)
        dflow.verify('//trop/front/post_account_res#/body', res.body)
    })

    // it('req => error', async () => {
    //     res = await req.post(path)
    //         .send({
    //             email: 'banana@mail.com',
    //             password: 'banana',
    //             role: 'root'
    //         })
    //         console.log(res.body);
    //     assert.equal(res.status, 409)
    // })
})
