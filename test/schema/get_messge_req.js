const assert = require('assert')

const box = require('../box')

describe('schema://trop/front/get_message_req', () => {
    let schema = '//trop/front/get_message_req#/params'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(params)', async () => {
        dflow.verify(schema, {})
    })

    it('verify(params)', async () => {
        dflow.verify(schema, {
            q: "keyword",
            p: 2,
            s: 8
        })
    })

    it('verify(params) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                page: 1,
            })
        }, Array)
    })
})
