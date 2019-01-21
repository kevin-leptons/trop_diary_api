# Changelog

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
