const {HttpError} = require('../error')

function get_request_ip(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress
}

function parse_query_int(query, keys) {
    for (let key of keys) {
        if (!query.hasOwnProperty(key)) {
            continue
        }

        try {
            query[key] = parseInt(query[key])
        } catch (e) {
            let http_err = new HttpError(400, 'Not a integer number', e)
            throw http_err
        }
    }
}

/*
Output Integer as UNIX timestamp
*/
function timestamp() {
    let t_ms = Date.now()
    return Math.floor(t_ms / 1000)
}

module.exports = {
    get_request_ip: get_request_ip,
    parse_query_int: parse_query_int,
    timestamp: timestamp
}
