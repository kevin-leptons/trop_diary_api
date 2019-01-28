## Database

## account



## refresh_token



## message



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
