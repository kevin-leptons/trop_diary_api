const assert = require('assert')

const box = require('../box')
const {Http400} = require('../../lib/error')

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
            p: 2
        })
    })

    it('verify(query) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                page: 1,
            })
        }, Http400)
    })
})
