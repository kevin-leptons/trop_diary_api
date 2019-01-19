const fs = require('fs')

const jwt = require('jsonwebtoken')

const {AuthError} = require('../error')

class Auth {
    /*
    Input
        * account / AccountStore.
        * private_key / string, path to private key file.
    */
    constructor(account, private_key) {
        this._account = account
        this._cert = fs.readFileSync(private_key)
    }

    /*
    Input
        * email / string.
        * password / string.
    Ouput
        * string - token.
    */
    async create_token(email, password) {
        let account = await this._account.match(email, password)
        if (!account) {
            throw new AuthError()
        }
        return this._create_token(account)
    }

    // PRIVATE MEMBERS?

    _create_token(account) {
        let data = {
            role: account.role
        }

        return jwt.sign(data, this._cert, {
            expiresIn: '1d',
            subject: account._id.toString(),
            issuer: '@trop/diary_api'
        })
    }
}

module.exports = Auth
