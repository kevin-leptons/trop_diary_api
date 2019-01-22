const assert = require('assert')

const box = require('../box')
const {Http400} = require('../../lib/error')

describe('schema://trop/front/post_message_req#/body', () => {
    let schema = '//trop/front/post_message_req#/body'
    let dflow

    before(async () => {
        let service = await box.service()
        dflow = service.dflow
    })

    it('verify(level + message)', async () => {
        dflow.verify(schema, {
            level: 0,
            message: "something happen"
        })
    })

    it('verify(level + message + label)', async () => {
        dflow.verify(schema, {
            level: 0,
            message: "something happen",
            label: "cluster1"
        })
    })

    it('verify({}) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {})
        }, Http400)
    })

    it('verify(level) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                level: 0
            })
        }, Http400)
    })

    it('verify(message) => error', async () => {
        assert.throws(() => {
            dflow.verify(schema, {
                message: "something happen"
            })
        }, Http400)
    })
})
