function get_request_ip(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}

module.exports = {
    get_request_ip: get_request_ip
}
