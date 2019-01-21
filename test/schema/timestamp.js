const assert = require('assert')

const box = require('../box')

describe('schema://atom/timestamp', () => {
    let schema = '//atom/timestamp'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(0)', async () => {
        dflow.verify(schema, 0)
    })

    it('verify(34132432)', async () => {
        dflow.verify(schema, 34132432)
    })

    it('verify(-1) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, -1)
        }, Array)
    })
})
