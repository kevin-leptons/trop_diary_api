const assert = require('assert')

const box = require('../box')
const {InvalidData} = require('../../lib/error')

describe('schema://trop/front/get_message_req#/query', () => {
    let schema = '//trop/front/get_message_req#/query'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(query)', async () => {
        dflow.raw_verify(schema, {})
    })

    it('verify(query)', async () => {
        dflow.raw_verify(schema, {
            p: 2
        })
    })

    it('verify(query) => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, {
                page: 1,
            })
        }, InvalidData)
    })
})
