let _values = {}

function set_value(key, value) {
    _values[key] = value
}

function get_value(key) {
    return _values[key]
}

module.exports = {
    get: get_value,
    set: set_value
}
