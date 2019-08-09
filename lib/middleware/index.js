module.exports = {
    error: require('./error_middleware'),
    service: require('./service_middleware'),
    content_type: require('./content_type_middleware'),
    json: require('./json_middleware'),
    router_not_found: require('./router_not_found')
}
