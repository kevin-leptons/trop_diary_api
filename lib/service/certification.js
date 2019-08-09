const {IService, Config} = require('@trop/factory')
const fs = require('fs')

const uuid = require('uuid-mongodb')

class Certificate extends IService {
    static get dependency() {
        return []
    }

    constructor(pkey_file) {
        super()
        this._private_key = pkey_file ?
            fs.readFileSync(pkey_file) : uuid.v4().toString()
    }

    async open() {}

    async close() {}

    get private_key() {
        return this._private_key
    }
}

module.exports = Certificate
