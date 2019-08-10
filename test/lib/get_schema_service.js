const {Schema} = require('../../lib/service')

let _schema_service = undefined

function get_schema_service() {
    if (_schema_service === undefined) {
        _schema_service = new Schema()
    }
    return _schema_service
}

module.exports = get_schema_service
