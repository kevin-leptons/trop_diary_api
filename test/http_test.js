async function http_test(res, validator) {
    try {
        return await Promise.resolve(validator())
    } catch (e) {
        console.error(`${res.status} Response`.padEnd(80, '.'))
        console.error(res.body)
        throw e
    }
}

module.exports = http_test
