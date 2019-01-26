## Database

## account

* `_id` / UUID
* `email` / string
* `created` / integer, as UNIX timestamp
* `modifed` / integer, as UNIX timestamp, last modified time
* `password` / string, as bcrypt hashed password
* `role` / string, one of `r`, `w`, `rw` and `root`

## refresh_token

* `_id` / UUID, as ID and refresh token
* `account_id` / UUID, account belong to token

## message

* `_id` / UUID
* `level` / integer, 0 is `info`, 1 is `debug`, 2 is `warn`, 3 is `error` and
  4 is `fatal`
* `label` / string, as group of message
* `created` / integer, as UNIX timestamp
* `content` / any, as content of message

## error

* `_id` / UUID
* `created` / integer, as UNIX timestamp
* `req` / object, as HTTP request message
    * `method` / string, HTTP method, one of `get`, `post`, `put`, `patch`
       or `delete`
    * `path` / string, request path, does not contains query
    * `query` / object, key-value pairs of query
    * `body` / string | object | array
* `res` / object, as HTTP response message
    * `status` / integer, HTTP status code
* `front` / any, error information which sent to client
* `back` / HttpError, http error was throw
* `origin` / any, pre-error before throw a http error
