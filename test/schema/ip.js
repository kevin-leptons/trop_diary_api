const assert = require('assert')

const box = require('../box')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/ip', () => {
    let schema = '//atom/ip'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(ipv4)', async () => {
        dflow.raw_verify(schema, '192.168.1.1')
    })

    it('verify(ipv6)', async () => {
        dflow.raw_verify(schema, '2001:db8:1234:0000:0000:0000:0000:0000')
    })

    it('verify() => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, 'This is not IP Address')
        }, InvalidData)
    })
})
