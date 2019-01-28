const assert = require('assert')

const box = require('../box')
const {InvalidData} = require('../../lib/error')

describe('schema://atom/bcrypt_2abxy', () => {
    let schema = '//atom/bcrypt_2abxy'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    let d1 = '$2b$10$KUng9EPlraYWHRiBjvDXPehS466Bgj6/YQUQgCwGoPYsPkEGCMO.i'
    it(`verify(${d1})`, async () => {
        dflow.raw_verify(schema, d1)
    })

    let d2 = '$2b$10$KUng9EPlraYWHRiBjvDXPehS466Bgj6/YQUQgCwGoPYsPkEGCMO'
    it(`verify(${d2}) => error`, async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, d2)
        }, InvalidData)
    })

    let d3 = '$2$10$KUng9EPlraYWHRiBjvDXPehS466Bgj6/YQUQgCwGoPYsPkEGCMO.i'
    it(`verify(${d3}) => error`, async () => {
        assert.throws(() => {
            dflow.raw_verify(schema, d2)
        }, InvalidData)
    })
})
