const {ErrorChain} = require('@trop/gear').error

async function http_assert(res, validator) {
    try {
        return await Promise.resolve(validator())
    } catch (e) {
        console.error(`${res.status} Response`.padEnd(80, '.'))
        console.error(JSON.stringify(res.body, null, 2))
        if (e instanceof ErrorChain) {
            console.error(e.chain)
        } else {
            console.error(e)
        }
        throw e
    }
}

module.exports = http_assert
