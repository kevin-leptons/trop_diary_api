const assert = require('assert')

const box = require('../box')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/date', () => {
    let schema = '//atom/date'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    let d1 = '2018-12-31T23:59:60Z'
    it(`verify(${d1})`, async () => {
        dflow.raw_verify(schema, d1)
    })

    let d2 = '2018-12-31T23:59:60+07:00'
    it(`verify(${d2})`, async () => {
        dflow.raw_verify(schema, d2)
    })

    let d3 = '2018-12-31T23:59:60-07:00'
    it(`verify(${d3})`, async () => {
        dflow.raw_verify(schema, d3)
    })

    let d4 = '2018-12-31T23:59:60.6969Z'
    it(`verify(${d4})`, async () => {
        dflow.raw_verify(schema, d4)
    })

    let d5 = '2018-12-31T23:59:60'
    it(`verify(${d5}) => error`, async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, d5)
        }, InvalidData)
    })

    let d6 = '2018-12-31T23:59:60ZAAAAA'
    it(`verify(${d6}) => error`, async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, d6)
        }, InvalidData)
    })
})
