const assert = require('assert')

const box = require('../box')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/name#/restrict', () => {
    let schema = '//atom/name#/restrict'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(mr_bean)', async () => {
        dflow.raw_verify(schema, 'mr_bean')
    })

    it('verify(mr_bean_001)', async () => {
        dflow.raw_verify(schema, 'mr_bean_001')
    })

    it('verify(mr bean) => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, 'mr bean')
        }, InvalidData)
    })

    it('verify(Mr.Bean) => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, 'Mr.Bean')
        }, InvalidData)
    })
})
