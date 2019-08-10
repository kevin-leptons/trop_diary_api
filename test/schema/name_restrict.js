const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/name#/restrict', () => {
    let schema = '//atom/name#/restrict'
    let schema_service = get_schema_service()

    it('verify(mr_bean)', async () => {
        schema_service.raw_verify(schema, 'mr_bean')
    })

    it('verify(mr_bean_001)', async () => {
        schema_service.raw_verify(schema, 'mr_bean_001')
    })

    it('verify(mr bean) => error', async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, 'mr bean')
        }, InvalidData)
    })

    it('verify(Mr.Bean) => error', async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, 'Mr.Bean')
        }, InvalidData)
    })
})
