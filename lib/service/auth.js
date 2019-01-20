const fs = require('fs')

const jwt = require('jsonwebtoken')

const {Http401, Http403} = require('../error')

class Auth {
    /*
    Input
        * account_store / AccountStore.
        * refresh_token_store / RefreshTokenStore.
        * private_key / string, path to private key file.
    */
    constructor(account_store, refresh_token_store, private_key) {
        this._account_store = account_store
        this._refresh_token_store = refresh_token_store
        this._cert = fs.readFileSync(private_key)
        this._expires_in = 4 * 60 * 60 // 4 hours
    }

    /*
    Input
        * type / string / 'password' or 'refresh_token'
        * username / string, if type=password
        * password / string, if type=password
        * refresh_token / string, if type=refresh_token
    Output Object
        * type / string / 'bearer'
        * express_in / integer
        * access_token / string
        * refresh_token / string
    Exception
        * Http401, unauthorized
    */
    async create_token(conf) {
        switch (conf.grant_type) {
            case 'password': return await this._create_token_password(
                conf.username,
                conf.password
            )
            case 'refresh_token': return await this._create_token_refresh(
                conf.refresh_token
            )
            default: throw Error(`Invalid token request type "${conf.type}"`)
        }
    }

    /*
    Input
        * req / express.Request, request from express route
        * roles / Array<String>/ [], expected that req is in roles
    Ouput
        * None
    Exception
        * Http401, unauthorized
        * Http403, forbiden
    */
    async verify(req, roles) {
        let token_encoded = this._get_token_encoded(req)
        if (!token_encoded) {
            throw new Http401()
        }

        try {
            let token = jwt.verify(token_encoded, this._cert)
            if (token.role === 'root') {
                return token
            }
            if (roles.length === 0) {
                return token
            }
            if (roles.indexOf(token.role) < 0) {
                throw new Http403()
            }
            return token
        } catch {
            throw new Http401()
        }
    }

    // PRIVATE MEMBERS

    async _create_token_password(username, password) {
        let account = await this._account_store.match(username, password)
        if (!account) {
            throw new Http401()
        }

        return await this._create_token(account)
    }

    async _create_token_refresh(refresh_token) {
        let old = await this._refresh_token_store.find(refresh_token)
        if (!old) {
            throw new Http401()
        }

        let account = await this._account_store.find(old.account_id)
        if (!account) {
            throw new Http401()
        }

        let token = await this._create_token(account)
        await this._refresh_token_store.remove(old.id)

        return token
    }

    async _create_token(account) {
        return {
            type: "bearer",
            expires_in: this._expires_in,
            access_token: this._create_access_token(account),
            refresh_token: await this._refresh_token_store.create(account._id)
        }
    }

    _create_access_token(account) {
        let data = {
            role: account.role
        }

        return jwt.sign(data, this._cert, {
            expiresIn: this._expires_in,
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
