const assert = require('assert')

const box = require('../box')

describe('schema://atom/version', () => {
    let schema = '//atom/version'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(3)', async () => {
        dflow.verify(schema, '3')
    })

    it('verify(3.2)', async () => {
        dflow.verify(schema, '3.2')
    })

    it('verify(3.2.1)', async () => {
        dflow.verify(schema, '3.2.1')
    })

    it('verify(3.2.1.0)', async () => {
        dflow.verify(schema, '3.2.1.0')
    })

    it('verify(3.2.1.0.9) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, '3.2.1.0.9')
        })
    })
})
