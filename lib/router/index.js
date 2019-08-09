const {Router} = require('express')

let router = Router()

router.use('/', require('./root'))
router.use('/token', require('./token'))
router.use('/account', require('./account'))
router.use('/key', require('./key'))
router.use('/message', require('./message'))

module.exports = router
