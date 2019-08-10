async function http_assert(res, validator) {
    try {
        return await Promise.resolve(validator())
    } catch (e) {
        console.error(`${res.status} Response`.padEnd(80, '.'))
        console.error(JSON.stringify(res.body, null, 2))
        console.log(e)
        throw e
    }
}

module.exports = http_assert
