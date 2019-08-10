const {MongoError} = require('mongodb')
const {IService, Config} = require('@trop/factory')
const bcrypt = require('bcrypt')
const uuid = require('uuid-mongodb')

const {HttpError} = require('../error')
const util = require('../util')
const Storage = require('./storage')

class AccountStorage extends IService {
    static get dependency() {
        return [Config, Storage]
    }

    /*
    Input
        * conf / GlobalConf.
        * store / Store.
    */
    constructor(conf, storage) {
        super()
        this._conf = conf
        this._storage = storage
    }

    async open() {
        this._coll = this._storage.collection('account')
    }

    async close() {}

    /*
    Input
        * keyword / string / null.
        * page_index / integer / base on 1.
    Output Array<Object>
    */
    async list(keyword=null, page_index=1) {
        let query = {}
        let skip = (page_index - 1) * this._conf.page_size

        if (keyword) {
            query.email = {$regex: `${keyword}`}
        }

        let res = await this._coll.find(query, {
            projection: {
                password: false
            }
        }).
        skip(skip).
        limit(this._conf.page_size)

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
            _id: uuid.v4(),
            email: email,
            password: this._hash_password(password),
            role: role,
            created: util.timestamp(),
            modified: util.timestamp()
        }
        let res = await this._coll.insertOne(account)
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
            throw new HttpError(401, 'Invalid email or password')
        }

        let new_hash = this._hash_password(new_password)
        await this._coll.updateOne({_id: account._id}, {
            $set: {
                password: new_hash,
                modified: util.timestamp()
            }
        })
    }

    /*
    Input
        * email / string.
        * role / string.
    Output
        * None
    */
    async change_role(email, role) {
        let account = await this._coll.findOne({
            email: email
        })
        if (!account) {
            throw new HttpError(400, 'Email does not exist')
        }

        await this._coll.updateOne({_id: account._id}, {
            $set: {
                role: role,
                modifed: util.timestamp()
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
        let account = await this._coll.findOne({
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
        return await this._coll.findOne({
            _id: id
        })
    }

    /*
    Input
        * email / string.
    Output
        * None
    */
    async remove(email) {
        let account = await this._coll.findOne({
            email: email
        })
        if (!account) {
            throw new HttpError(400, 'Email does not exist')
        }
        await this._coll.deleteOne({
            _id: account._id
        })
    }

    // PRIVATE MEMBERS

    _hash_password(password) {
        return bcrypt.hashSync(password, 10)
    }
}

module.exports = AccountStorage
