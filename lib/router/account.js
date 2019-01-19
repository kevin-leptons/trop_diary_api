const Router = require('@trop/async_router')
const {MongoError} = require('mongodb')

let router = new Router()

router.
post('/', async (req, res) => {
    try {
        req.sv.dflow.verify('//trop/front/post_account_req#/body', req.body)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    try {
        let id = await req.sv.account_store.create(
            req.body.email,
            req.body.password,
            req.body.role
        )
        res.status(201).json({
            _id: id
        })
    } catch (e) {
        if (e instanceof MongoError && e.code === 11000) {
            res.status(409).json({
                error: 'Existed email'
            })
            return
        }

        throw e
    }
})

module.exports = router.express
