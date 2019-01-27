const fs = require('fs')

const uuid = require('uuid-mongodb')

class Certificate {
    constructor(pkey_file) {
        this._private_key = pkey_file ?
            fs.readFileSync(pkey_file) : uuid.v4().toString()
    }

    get private_key() {
        return this._private_key
    }
}

module.exports = Certificate
