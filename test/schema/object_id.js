const assert = require('assert')

const box = require('../box')

describe('schema://atom/object_id', () => {
    let schema = '//atom/object_id'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(507f191e810c19729de860ea)', async () => {
        dflow.verify(schema, '507f191e810c19729de860ea')
    })

    let d1 = '507f191e810c19729dABCDEF'
    it(`verify(${d1})`, async () => {
        dflow.verify(schema, d1)
    })

    let d2 = '507f191e810c19729dZZZZZZ'
    it(`verify(${d2}) => error`, async () => {
        assert.throws(() => {
            dflow.verify(schema, d2)
        }, Array)
    })
})
