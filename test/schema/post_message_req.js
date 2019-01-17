const assert = require('assert')

const box = require('../box')

describe('schema://trop/front/post_message_req', () => {
    let schema = '//trop/front/post_message_req'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(level + message)', async () => {
        dflow.verify(schema, {
            level: "info",
            message: "something happen"
        })
    })

    it('verify(level + message + label)', async () => {
        dflow.verify(schema, {
            level: "info",
            message: "something happen",
            label: "cluster1"
        })
    })

    it('verify({}) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {})
        }, Array)
    })

    it('verify(level) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                level: "info"
            })
        }, Array)
    })

    it('verify(message) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                message: "something happen"
            })
        }, Array)
    })
})
