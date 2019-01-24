const fs = require('fs')

class Certificate {
    constructor(pkey_file) {
        this._private_key = fs.readFileSync(pkey_file)
    }

    get private_key() {
        return this._private_key
    }
}

module.exports = Certificate
