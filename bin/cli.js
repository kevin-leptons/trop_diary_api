#!/usr/bin/env node

const os = require('os')

const yargs = require('yargs')

const {App} = require('../lib')

yargs.
usage('$0 <cmd> [args]').

command('start', 'Online', (yargs) => {
    yargs.
    option('conf-file', {
        describe: 'Path to configuration file',
        type: 'string',
        default: '/etc/trop_diary_api/conf.json'
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
        conf_file: conf.confFile,
        clean: conf.clean
    })
    await app.start(conf.port, conf.host)
}
