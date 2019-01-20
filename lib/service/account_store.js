const bcrypt = require('bcrypt')
const {MongoError} = require('mongodb')

class AccountStore {
    /*
    Input
        * store / Store.
    */
    constructor(store) {
        this._doc = store.collection('account')
    }

    async init() {
        await this._create_indexes()
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
        * old_passowrd / string.
        * new_password / string.
    Output
        * None
    */
    async change_password(email, old_passowrd, new_password) {
        let account = await this.match(email, old_passowrd)
        if (!account) {
            throw Error('Invalid email and password')
        }

        let new_hash = this._hash_password(new_password)
        await this._doc.update({_id: account._id}, {
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
