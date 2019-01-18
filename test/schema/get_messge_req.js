const assert = require('assert')

const box = require('../box')

describe('schema://trop/front/get_message_req#/query', () => {
    let schema = '//trop/front/get_message_req#/query'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(query)', async () => {
        dflow.verify(schema, {})
    })

    it('verify(query)', async () => {
        dflow.verify(schema, {
            q: "keyword",
            p: 2,
            s: 8
        })
    })

    it('verify(query) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                page: 1,
            })
        }, Array)
    })
})
