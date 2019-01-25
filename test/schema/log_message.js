const assert = require('assert')

const box = require('../box')

describe('schema://atom/log_message', () => {
    let schema = '//atom/log_message'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(1)', async () => {
        dflow.raw_verify(schema, 1)
    })

    it('verify(one)', async () => {
        dflow.raw_verify(schema, 'one')
    })

    it('verify({})', async () => {
        dflow.raw_verify(schema, {})
    })
})
