const assert = require('assert')

const box = require('../box')

describe('schema://atom/log_level', () => {
    let schema = '//atom/log_level'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(info)', async () => {
        dflow.verify(schema, 'info')
    })

    it('verify(debug)', async () => {
        dflow.verify(schema, 'debug')
    })

    it('verify(error)', async () => {
        dflow.verify(schema, 'error')
    })

    it('verify(warn)', async () => {
        dflow.verify(schema, 'warn')
    })


    it('verify(fatal)', async () => {
        dflow.verify(schema, 'fatal')
    })

    it('verify(XXXX) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, 'XXXX')
        })
    })
})
