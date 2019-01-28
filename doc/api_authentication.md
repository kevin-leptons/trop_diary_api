# Authentication

* Token is uses as credential, see [POST /token](api_post_token.md) to
  create a bearer token or [POST /key](api_post_key.md) to create create a
  new key token
* With authorization resources, header `Authorization` must be set by format
  `bearer TOKEN`, where `TOKEN` is `access_token` from token
* Bearer token provides full roles `r`, `w`, `rw` or `root` and has expired
  time, it use for command line
* Key token provice roles `r`, `w` or `rw` and hs no expired time, it use
  for `server-server` side where application write log messages
