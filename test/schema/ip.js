const assert = require('assert')

const {Schema} = require('../../lib/service')
const {get_schema_service} = require('../lib')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/ip', () => {
    let schema = '//atom/ip'
    let schema_service = get_schema_service()

    it('verify(ipv4)', async () => {
        schema_service.raw_verify(schema, '192.168.1.1')
    })

    it('verify(ipv6)', async () => {
        schema_service.raw_verify(schema, '2001:db8:1234:0000:0000:0000:0000:0000')
    })

    it('verify() => error', async () => {
        assert.throws(() => {
            schema_service.raw_verify(schema, 'This is not IP Address')
        }, InvalidData)
    })
})
