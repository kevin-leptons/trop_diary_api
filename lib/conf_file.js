const seed = require('@trop/seed')

function load(file) {
    return seed.load(_CONF_SCHEMA, file, _CONF_DEFAULT)
}

module.exports = {
    load
}

// private members

const _CONF_SCHEMA = {
    type: 'object',
    additionalProperties: false,
    required: [
        'private_key',
        'storage'
    ],
    properties: {
        host: {
            type: 'string'
        },
        port: {
            type: 'integer',
            minimum: 0
        },
        private_key: {
            type: 'string'
        },
        storage: {
            type: 'object',
            additionalProperties: false,
            required: [
                'endpoint'
            ],
            properties: {
                endpoint: {
                    type: 'string',
                    format: 'uri'
                },
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        },
        root_email: {
            type: 'string',
            format: 'email'
        },
        clean: {
            type: 'boolean'
        },
        page_size: {
            type: 'integer',
            minimum: 1
        }
    }
}

const _CONF_DEFAULT = {
    'host': '0.0.0.',
    'port': 6969,
    'root_email': 'root@mail.com',
    'clean': false,
    'page_size': 8
}
