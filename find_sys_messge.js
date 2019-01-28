#!/usr/bin/env node

const {MongoClient} = require('mongodb')
const uuid = require('uuid-mongodb')

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
    let doc = db.collection('error')
    let log = await doc.findOne({
        _id: uuid.from(process.argv[2])
    })
    if (!log) {
        console.log('Not Found')
    } else {
        console.log(_title('created'), _format_date(log.created))
        console.log(_title('req_method'), log.req.method.toUpperCase())
        console.log(_title('res_status'), log.res.status)
        console.log()
        console.log(_block('req_path'))
        console.log(log.req.path)
        console.log(_block('req_query'))
        console.log(log.req.query)
        console.log(_block('req_body'))
        console.log(log.req.body)
        console.log(_block('front'))
        console.log(JSON.stringify(log.front, null, 2))
        console.log(_block('back'))
        console.log(log.back)
        console.log(_block('origin'))
        console.log(log.origin)
    }
    await client.close()
}

function _title(title) {
    return title.toUpperCase().padEnd(16)
}

function _block(title) {
    return '====' + title.toUpperCase() + '===='
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
