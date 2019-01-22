const path = require('path')

const {DataFlow} = require('@trop/dflow')

const {Http400} = require('../error')

class DFlow {
    constructor() {
        let dir = path.join(__dirname, '../../schema')
        this._dflow = new DataFlow([dir])
    }

    verify(id, data) {
        let e = this._dflow.verify(id, data)
        if (e) {
            throw new Http400(e)
        }
    }
}

module.exports = DFlow
