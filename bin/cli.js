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
    }).
    option('pkey', {
        describe: 'Path to private key',
        type: 'string',
        demand: true
    }).
    option('root-email', {
        describe: 'To create root account with default password',
        type: 'string'
    }).
    option('clean', {
        describe: 'Clear all data',
        type: 'boolean',
        default: false
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
        store: conf.store,
        private_key: conf.pkey,
        root_email: conf.rootEmail,
        clean: conf.clean
    })
    await app.start(conf.port, conf.host)
}
