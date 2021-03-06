const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')

describe('schema://atom/log_data', () => {
    let schema = '//atom/log_data'
    let schema_service = get_schema_service()

    it('verify(1)', async () => {
        schema_service.verify(schema, 1)
    })

    it('verify(one)', async () => {
        schema_service.verify(schema, 'one')
    })

    it('verify({})', async () => {
        schema_service.verify(schema, {})
    })
})
