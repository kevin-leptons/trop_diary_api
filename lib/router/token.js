const Router = require('@trop/async_router')

const {AuthError} = require('../error')

let router = new Router()

router.
post('/', async (req, res) => {
    try {
        req.sv.dflow.verify('//trop/front/post_token_req#/body', req.body)
    } catch (e) {
        res.status(400).send(e)
        return
    }

    try {
        let token = await req.sv.auth.create_token(req.body.email, req.body.password)
        res.json(token)
    } catch (e) {
        if (e instanceof AuthError) {
            res.status(401).send()
            return
        }
        throw e
    }
})

module.exports = router.express
