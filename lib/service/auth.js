const fs = require('fs')

const jwt = require('jsonwebtoken')

const {AuthError, Http401, Http403} = require('../error')

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

    /*
    Input
        * req / express request.
        * roles / Array<String>.
    Ouput
        * None
    */
    async verify(req, roles) {
        let token_encoded = this._get_token_encoded(req)
        if (!token_encoded) {
            throw new Http401()
        }

        try {
            let token = jwt.verify(token_encoded, this._cert)
            if (token.role === 'root') {
                return
            }
            if (roles.indexOf(token.role) < 0) {
                throw new Http403()
            }
        } catch {
            throw new Http401()
        }
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

    _get_token_encoded(req) {
        let auth_header = req.headers.authorization
        if (!auth_header) {
            return null
        }

        let parts = auth_header.split(' ')
        if (parts.length != 2) {
            return null
        }
        if (parts[0].toLowerCase() !== 'bearer') {
            return null
        }
        return parts[1]
    }
}

module.exports = Auth
