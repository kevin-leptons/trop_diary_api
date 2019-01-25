const assert = require('assert')

const box = require('../box')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/log_level', () => {
    let schema = '//atom/log_level'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(info)', async () => {
        dflow.raw_verify(schema, 0)
    })

    it('verify(debug)', async () => {
        dflow.raw_verify(schema, 1)
    })

    it('verify(error)', async () => {
        dflow.raw_verify(schema, 2)
    })

    it('verify(warn)', async () => {
        dflow.raw_verify(schema, 3)
    })


    it('verify(fatal)', async () => {
        dflow.raw_verify(schema, 4)
    })

    it('verify(-1) => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, -1)
        }, InvalidData)
    })

    it('verify(5) => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, 5)
        }, InvalidData)
    })

    it('verify(string) => error', async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, 'info')
        }, InvalidData)
    })
})
