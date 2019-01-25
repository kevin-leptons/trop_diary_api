#!/usr/bin/env node

const {MongoClient} = require('mongodb')
const uuid = require('uuid-mongodb')

const _LEVEL_MAP = {
    0: 'info',
    1: 'debug',
    2: 'warn',
    3: 'error',
    4: 'fatal'
}

async function main() {
    if (process.argv.length != 3) {
        console.error(`Use: ${process.argv[2]} LOG_ID`)
        process.exit(1)
    }

    let store = 'mongodb://localhost/trop_diary_api'
    let client = await MongoClient.connect(store, {
        useNewUrlParser: true
    })
    let db = client.db('trop_diary_api')
    let doc = db.collection('system')
    let log = await doc.findOne({
        _id: uuid.from(process.argv[2])
    })
    if (!log) {
        console.log('Not Found')
    } else {
        console.log(_title('level'), _format_level(log.level))
        console.log(_title('created'), _format_date(log.created))
        console.log(_title('req_method'), log.req_method)
        console.log(_title('res_status'), log.res_status)
        console.log()
        console.log(_block('req_path'))
        console.log(log.req_path)
        console.log(_block('req_query'))
        console.log(log.req_query)
        console.log(_block('req_body'))
        console.log(log.req_body)
        console.log(_block('front'))
        console.log(JSON.stringify(log.front, null, 2))
        console.log(_block('back'))
        console.log(JSON.stringify(log.back, null, 2))
        console.log(_block('stack'))
        console.log(log.stack)
    }
    await client.close()
}

function _title(title) {
    return title.toUpperCase().padEnd(16)
}

function _block(title) {
    return '====' + title.toUpperCase() + '===='
}

function _format_level(no) {
    let str = _LEVEL_MAP[no]
    if (!str) {
        return '????'
    } else {
        return str.toUpperCase()
    }
}

function _format_date(timestamp) {
    let date = new Date(timestamp)
    return date.toISOString()
}

main().
catch(e => {
    console.error(e)
    process.exit(1)
})
