# Auth

## Authentication

### By Token

* Token is uses as credential, see [token](api_res_token.md) to create/refresh
  a token
* With authorization resources, header `Authorization` must be set to
  `bearer TOKEN`
* Token provides full roles `r`, `w`, `rw` and `root`

### By Key

* Key is uses as credential, see [key](api_res_key.md) to create a key
* With authorization resources, header `Authorization` must be set to
  `key KEY`
* Key provides roles `r`, `w` and `rw`

## Authorization

There are four roles, the detail required role is show on specific resources.

* `root` - can do any thing
* `r` - can read log messages
* `w` - can write log messages
* `rw` - can both read/write log messages
