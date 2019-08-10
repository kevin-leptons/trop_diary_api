const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/version', () => {
    let schema = '//atom/version'
    let schema_service = get_schema_service()

    it('verify(3)', async () => {
        schema_service.verify(schema, '3')
    })

    it('verify(3.2)', async () => {
        schema_service.verify(schema, '3.2')
    })

    it('verify(3.2.1)', async () => {
        schema_service.verify(schema, '3.2.1')
    })

    it('verify(3.2.1.0)', async () => {
        schema_service.verify(schema, '3.2.1.0')
    })

    it('verify(3.2.1.0.9) => error', async () => {
        assert.throws(() => {
            schema_service.verify(schema, '3.2.1.0.9')
        }, InvalidData)
    })
})
