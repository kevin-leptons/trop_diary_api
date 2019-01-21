#!/usr/bin/env node

const {MongoClient, ObjectId} = require('mongodb')

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
        _id: ObjectId(process.argv[2])
    })
    if (!log) {
        console.log('Not Found')
    } else {
        console.log('===FOUND===')
        console.log(log.message)
        console.log('===FOUND===')
    }
    await client.close()
}

main().
catch(e => {
    console.error(e)
    process.exit(1)
})
