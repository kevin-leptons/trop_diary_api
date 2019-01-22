const assert = require('assert')

const box = require('../box')
const {Http400} = require('../../lib/error')

describe('schema://atom/log_label', () => {
    let schema = '//atom/log_label'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(aa)', async () => {
        dflow.verify(schema, 'aa')
    })

    let d1 = '!@#$'
    it(`verify(${d1}) => error`, async () => {
        assert.throws(() => {
            dflow.verify(schema, d1)
        }, Http400)
    })

    let d2 = 'a'.repeat(17)
    it(`verify(${d2}) => error`, async () => {
        assert.throws(() => {
            dflow.verify(schema, d2)
        }, Http400)
    })
})
