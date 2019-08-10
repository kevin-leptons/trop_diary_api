#!/usr/bin/env node

const os = require('os')

const yargs = require('yargs')

const {app} = require('../lib')

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
    await app.run_with_configuration_file(conf.confFile)
}
