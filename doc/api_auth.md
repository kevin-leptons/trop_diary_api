# Auth

## Authentication

* Token is uses as credential, see [token](api_res_token.md) to create/refresh
  a token
* With authorization resources, header `Authorization` must be set to
  `Bearer TOKEN`

## Authorization

There are four roles, the detail required role is show on specific resources.

* `root` - can do any thing
* `r` - can read log messages
* `w` - can write log messages
* `rw` - can both read/write log messages
