const assert = require('assert')

const box = require('../box')
const {Http400} = require('../../lib/error')

describe('schema://atom/log_level', () => {
    let schema = '//atom/log_level'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(info)', async () => {
        dflow.verify(schema, 0)
    })

    it('verify(debug)', async () => {
        dflow.verify(schema, 1)
    })

    it('verify(error)', async () => {
        dflow.verify(schema, 2)
    })

    it('verify(warn)', async () => {
        dflow.verify(schema, 3)
    })


    it('verify(fatal)', async () => {
        dflow.verify(schema, 4)
    })

    it('verify(-1) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, -1)
        }, Http400)
    })

    it('verify(5) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, 5)
        }, Http400)
    })

    it('verify(string) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, 'info')
        }, Http400)
    })
})
