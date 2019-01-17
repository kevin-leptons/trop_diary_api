#!/usr/bin/env node

const os = require('os')

const yargs = require('yargs')

const {App} = require('../lib')

yargs.
usage('$0 <cmd> [args]').

command('start', 'Online', (yargs) => {
    yargs.
    option('store', {
        describe: 'URL refers to MongoDB',
        type: 'string',
        default: 'mongodb://localhost/trop_diary'
    }).
    option('port', {
        describe: 'Port to listen',
        types: 'number',
        default: 80
    }).
    option('host', {
        describe: 'Internet address to bind on',
        type: 'string',
        default: '0.0.0.0'
    })
}, async_cli(cli_start)).

strict().
demandCommand().
help().
argv

function async_cli(async_fn) {
    return (arg) => {
        async_fn(arg).
        catch(e => {
            console.error(e)
            process.exit(1)
        })
    }
}

async function cli_start(conf) {
    let app = new App({
        store: conf.store
    })
    await app.start(conf.port, conf.host)
}
