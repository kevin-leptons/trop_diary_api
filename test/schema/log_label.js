const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/log_label', () => {
    let schema = '//atom/log_label'
    let schema_service = get_schema_service()

    it('verify(aa)', async () => {
        schema_service.raw_verify(schema, 'aa')
    })

    let d1 = '!@#$'
    it(`verify(${d1}) => error`, async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, d1)
        }, InvalidData)
    })

    let d2 = 'a'.repeat(17)
    it(`verify(${d2}) => error`, async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, d2)
        }, InvalidData)
    })
})
