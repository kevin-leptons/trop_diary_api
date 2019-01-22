const assert = require('assert')

const box = require('../box')
const {Http400} = require('../../lib/error')

describe('schema://atom/number', () => {
    let schema_int = '//atom/int'
    let schema_uint = '//atom/uint'
    let schema_float = '//atom/float'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify_int(100)', async () => {
        dflow.verify(schema_int, 100)
    })

    it('verify_int(100.1) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema_int, 100.1)
        }, Http400)
    })

    it('verify_uint(100)', async () => {
        dflow.verify(schema_uint, 100)
    })

    it('verify_uint(-100) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema_uint, -100)
        }, Http400)
    })

    it('verify_uint(100.1) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema_uint, 100.1)
        }, Http400)
    })
})
