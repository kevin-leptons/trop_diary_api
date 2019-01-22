const assert = require('assert')

const box = require('../box')
const {Http400} = require('../../lib/error')

describe('schema://atom/name#/restrict', () => {
    let schema = '//atom/name#/restrict'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(mr_bean)', async () => {
        dflow.verify(schema, 'mr_bean')
    })

    it('verify(mr_bean_001)', async () => {
        dflow.verify(schema, 'mr_bean_001')
    })

    it('verify(mr bean) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, 'mr bean')
        }, Http400)
    })

    it('verify(Mr.Bean) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, 'Mr.Bean')
        }, Http400)
    })
})
