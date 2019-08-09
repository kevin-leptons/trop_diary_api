const {IService, Config} = require('@trop/factory')
const jwt = require('jsonwebtoken')
const uuid = require('uuid-mongodb')

const {HttpError} = require('../error')
const AccountStorage = require('./account_storage')
const RefreshTokenStorage = require('./refresh_token_storage')
const Certification = require('./certification')

class Auth extends IService {
    static get dependency() {
        return [AccountStorage, RefreshTokenStorage, Certification]
    }

    /*
    Input
        * account_store / AccountStore.
        * refresh_token_store / RefreshTokenStore.
        * cert / Certification.
    */
    constructor(account_store, refresh_token_store, cert) {
        super()
        this._account_store = account_store
        this._refresh_token_store = refresh_token_store
        this._cert = cert
        this._expires_in = 4 * 60 * 60 // 4 hours
    }

    async open() {}

    async close() {}

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
        * role / String, one of 'r', 'w' or 'rw'
    Output Object
        * type / string / 'bearer'
        * express_in / integer
        * access_token / string
    Exception
        * Http401, unauthorized
    */
    create_token_key(conf) {
        return {
            type: 'key',
            access_token: this._create_access_token_key(conf.role),
            expires_in: 0
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
        let auth = this._parse_auth_header(req)
        if (!auth) {
            throw new HttpError(401, 'Invalid Authrization Header')
        }

        let ignore_expires
        switch (auth.type) {
            case 'bearer':
                ignore_expires = false
                break
            case 'key':
                ignore_expires = true
                break
            default:
                throw new HttpError(401, `Invalid Authentication Type "${auth.type}"`)
        }

        try {
            let token = jwt.verify(auth.access_token, this._cert.private_key, {
                ignoreExpiration: ignore_expires
            })
            if (token.role === 'root') {
                return token
            }
            if (roles.length === 0) {
                return token
            }
            if (roles.indexOf(token.role) < 0) {
                throw new HttpError(403, `Require ${roles}, you are ${token.role}`)
            }
            return token
        } catch (e) {
            throw new HttpError(401, 'Invalid token', e)
        }
    }

    // PRIVATE MEMBERS

    async _create_token_password(username, password) {
        let account = await this._account_store.match(username, password)
        if (!account) {
            throw new HttpError(401, `Invalid email or password`)
        }

        return await this._create_token(account)
    }

    async _create_token_refresh(refresh_token) {
        let id = uuid.from(refresh_token)
        let old = await this._refresh_token_store.find(id)
        if (!old) {
            throw new HttpError(401, 'No such refresh token')
        }

        let account = await this._account_store.find(old.account_id)
        if (!account) {
            throw new HttpError(401, `No such account ${old.account_id}`)
        }

        let token = await this._create_token(account)
        await this._refresh_token_store.remove(old._id)

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

        return jwt.sign(data, this._cert.private_key, {
            expiresIn: this._expires_in,
            subject: uuid.from(account._id).toString(),
            issuer: '@trop/diary_api'
        })
    }

    _parse_auth_header(req) {
        let auth_header = req.headers.authorization
        if (!auth_header) {
            return null
        }

        let parts = auth_header.split(' ')
        if (parts.length != 2) {
            return null
        }
        return {
            type: parts[0].toLowerCase(),
            access_token: parts[1]
        }
    }

    _create_access_token_key(role) {
        let data = {
            role: role,
            exp: 0
        }

        return jwt.sign(data, this._cert.private_key, {
            issuer: '@trop/diary_api'
        })
    }
}

module.exports = Auth
