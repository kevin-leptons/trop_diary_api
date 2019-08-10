const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/number', () => {
    let schema_int = '//atom/int'
    let schema_uint = '//atom/uint'
    let schema_float = '//atom/float'
    let schema_service = get_schema_service()
    
    it('verify_int(100)', async () => {
        schema_service.verify(schema_int, 100)
    })

    it('verify_int(100.1) => error', async () => {
        assert.throws(() => {
            schema_service.verify(schema_int, 100.1)
        }, InvalidData)
    })

    it('verify_uint(100)', async () => {
        schema_service.verify(schema_uint, 100)
    })

    it('verify_uint(-100) => error', async () => {
        assert.throws(() => {
            schema_service.verify(schema_uint, -100)
        }, InvalidData)
    })

    it('verify_uint(100.1) => error', async () => {
        assert.throws(() => {
            schema_service.verify(schema_uint, 100.1)
        }, InvalidData)
    })
})
