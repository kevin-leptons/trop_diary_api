const uuid = require('uuid-mongodb')
const {ErrorChain} = require('@trop/gear').error

const {HttpError} = require('../error')
const {ErrorStorage} = require('../service')

function error_middleware(err, req, res, next) {
    _error_middleware(err, req, res).
    catch(e => {
        res.status(500).json({
            message: 'Fatal Error'
        })
        console.error(e)
    })
}

module.exports = error_middleware

// private members

async function _error_middleware(err, req, res) {
    if (err instanceof HttpError) {
        await _handle_http_error(err, req, res)
    } else {
        await _handle_internal_error(err, req, res)
    }
}

async function _handle_http_error(err, req, res) {
    if (err.status >= 500 && err.status < 600) {
        await _handle_http5xx_error(err, req, res)
    } else if (err.status >= 400 && err.status < 500) {
        await _handle_http4xx_error(err, req, res)
    } else {
        await _handle_invalid_http_error(err, req, res)
    }
}

async function _handle_http5xx_error(err, req, res) {
    let error_storage = req.service.get(ErrorStorage)
    let log_id = await error_storage.write(req, err.status, err.chain)
    let res_data = {
        log_id: uuid.from(log_id).toString(),
        message: 'Internal Server Error'
    }

    res.status(err.status).json(res_data)
}

async function _handle_http4xx_error(err, req, res) {
    let error_storage = req.service.get(ErrorStorage)
    let log_id = await error_storage.write(req, err.status, err.chain)
    let res_data = {
        log_id: uuid.from(log_id).toString(),
        message: err.message,
        data: err.context
    }

    res.status(err.status).json(res_data)
}

async function _handle_invalid_http_error(err, req, res) {
    let error_storage = req.service.get(ErrorStorage)
    let error_data = {
        message: 'Invalid HTTP Error Code',
        status: err.status,
        chain: err.chain
    }
    let log_id = await error_storage.write(req, 500, error_data)
    let res_data = {
        log_id: uuid.from(log_id).toString(),
        message: 'Internal Server Error'
    }

    res.status(500).json(res_data)
}

async function _handle_internal_error(err, req, res) {
    let error_storage = req.service.get(ErrorStorage)
    let error_data = _get_error_data(err)
    let log_id = await error_storage.write(req, 500, error_data)
    let res_data = {
        log_id: uuid.from(log_id).toString(),
        message: 'Internal Server Error'
    }

    res.status(500).json(res_data)
}

function _get_error_data(err) {
    if (err instanceof ErrorChain) {
        return err.chain
    } else if (err instanceof Error) {
        return _get_standard_error_data(err)
    } else {
        return err.toString()
    }
}

function _get_standard_error_data(err) {
    if (typeof err.stack === 'string') {
        let lines = err.stack.split('\n')
        let lines_without_spaces = lines.map(l => l.trim())

        return lines_without_spaces
    } else {
        return err
    }
}
