const bcrypt = require('bcrypt')
const {MongoError} = require('mongodb')

const {Http401} = require('../error')

class AccountStore {
    /*
    Input
        * gconf / GlobalConf.
        * store / Store.
    */
    constructor(gconf, store) {
        this._gconf = gconf
        this._doc = store.collection('account')
    }

    async init() {
        await this._create_indexes()
    }

    /*
    Input
        * keyword / string / null.
        * page_index / integer / base on 1.
    Output Array<Object>
    */
    async list(keyword=null, page_index=1) {
        let query = {}
        let skip = (page_index - 1) * this._gconf.page_size

        if (keyword) {
            query.email = {$regex: `${keyword}`}
        }

        let res = await this._doc.find(query, {
            projection: {
                password: false
            }
        }).
        skip(skip).
        limit(this._gconf.page_size)

        return res.toArray()
    }

    /*
    Input
        * email / string.
        * password / string.
        * role / string. enum [root, r, w, rw]
    Output
        * string - identity.
    */
    async create(email, password, role) {
        let account = {
            email: email,
            password: this._hash_password(password),
            role: role,
            created: new Date(),
            modified: new Date()
        }
        let res = await this._doc.insertOne(account)
        return res.insertedId
    }

    /*
    Input
        * email / string
    Output
        * None.
    */
    async create_root(email) {
        try {
            await this.create(email, 'goddamnit', 'root')
        } catch (e) {
            if (e instanceof MongoError && e.code === 11000) {
                return
            }
            throw e
        }
    }

    /*
    Input
        * email / string.
        * old_password / string.
        * new_password / string.
    Output
        * None
    */
    async change_password(email, old_password, new_password) {
        let account = await this.match(email, old_password)
        if (!account) {
            throw new Http401()
        }

        let new_hash = this._hash_password(new_password)
        await this._doc.updateOne({_id: account._id}, {
            $set: {
                password: new_hash,
                modified: new Date()
            }
        })
    }

    /*
    Input
        * email / string.
        * password / string.
    Output
        * object - account information.
    */
    async match(email, password) {
        let account = await this._doc.findOne({
            email: email
        })
        if (!account) {
            return null
        }

        if (bcrypt.compareSync(password, account.password)) {
            return account
        } else {
            return null
        }
    }

    async find(id) {
        return await this._doc.findOne(id)
    }

    // PRIVATE MEMBERS

    _hash_password(password) {
        return bcrypt.hashSync(password, 10)
    }

    async _create_indexes() {
        await this._doc.createIndex({email: 1}, {unique: true})
    }
}

module.exports = AccountStore
