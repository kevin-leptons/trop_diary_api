#!/usr/bin/env node

const {MongoClient} = require('mongodb')
const uuid = require('uuid-mongodb')

async function main() {
    if (process.argv.length != 3) {
        console.error(`Use: ${process.argv[2]} LOG_ID`)
        process.exit(1)
    }

    let store = 'mongodb://localhost/trop_diary'
    let client = await MongoClient.connect(store, {
        useNewUrlParser: true
    })
    let db = client.db('trop_diary')
    let doc = db.collection('system')
    let log = await doc.findOne({
        _id: uuid.from(process.argv[2])
    })
    if (!log) {
        console.log('Not Found')
    } else {
        console.log('===FOUND===')
        console.log(JSON.stringify(log.message))
        console.log('===FOUND===')
    }
    await client.close()
}

main().
catch(e => {
    console.error(e)
    process.exit(1)
})
