const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/log_level', () => {
    let schema = '//atom/log_level'
    let schema_service = get_schema_service()

    it('verify(info)', async () => {
        schema_service.raw_verify(schema, 0)
    })

    it('verify(debug)', async () => {
        schema_service.raw_verify(schema, 1)
    })

    it('verify(error)', async () => {
        schema_service.raw_verify(schema, 2)
    })

    it('verify(warn)', async () => {
        schema_service.raw_verify(schema, 3)
    })


    it('verify(fatal)', async () => {
        schema_service.raw_verify(schema, 4)
    })

    it('verify(-1) => error', async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, -1)
        }, InvalidData)
    })

    it('verify(5) => error', async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, 5)
        }, InvalidData)
    })

    it('verify(string) => error', async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, 'info')
        }, InvalidData)
    })
})
