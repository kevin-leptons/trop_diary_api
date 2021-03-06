# Changelog

## v0.14.0

* Change configuration file from `JSON` to `YAML` format
* Change configuration attribute from `store` to `storage`
* Change API `GET /message` return newest message order
* Change message envelope, attribute `message` rename to `data`
* Change from Node.js v10 to v12
* Use `@trop/seed` to load configuration file
* Use `@trop/factory` to initialize services

## v0.13.0

* Enable and start service on Debian package is installed
* Use a tiny repository for Debian package at `packagecloud.io`

## v0.12.0

* Fix can not enable systemd service
* Fix override `/etc/trop_diary_api/conf.json` on update Debian package
* Use `docsify` as document reader
* Restructure Data Schema

## 0.11.0

* Drop install from NPM registry
* Change default listen port from `80` to `6969`
* Add deployment to systemd via Debian package manager
* Add non-private-key mode, it runs with random secret key

## v0.10.0

* Index on `message` document
* Change CLI `trop-diary-api start`
* Limit backtrack information to client on error 4xx
* Improve system message and reporting to client
* Add deployment to docker
* Add 404 system log
* Restrict request and response content type

## v0.9.0

* Fix API `POST /key` return type `key` instead of `bearer`

## v0.8.0

* Change identity of objects from `ObjectId` to `UUID`
* Improve system message storage
* Improve internal error handling
* Add API `POST /key` to create credential for `server-server` side

## v0.7.0

* Improve error interface between APIs and clients

## v0.6.0

* None API change: Add few reference links to client CLI and Node.js

## v0.5.0

* Remove filter `q`, `s` on `GET /message`
* Fix filter `p` on `GET /message`
* Change `error_id` of 500 error to `log_id`
* Add filter by lower level as `ll` and upper level as `ul`
  on `GET /message`
* Add filter lower created date as `lc` and upper created date as `uc`
  on `GET /message`
* Add filter label as `l` on `GET /message`
* Add API `GET /message/item/:id`

## v0.4.0

* Change `POST /token` interface, support create token from password and
  refresh_token
* Add `GET /account`
* Add `PATCH /account/password`
* Add `PATCH /account/role`
* Add `DELETE /account/item/:id`

## v0.3.0

* Add authentication by email and password
* Add authentication by token
* [X] Add filter by log level, date and label. This features did not add
  in this version, it is mistake
* Add CLI option `--clean`, clear all of data
* Add CLI option `--root-email`, create root account with default password.
* Add CLI option `--pkey`, path to private key file

## v0.2.0

* Fix serveral application loading
* Add schemas
* Change default listen address to 0.0.0.0
* Systemd service wait for network

## v0.1.0

* Skeleton for `document`, `data flow`, `store`, `service`, `async router`,
  `testing`
