# account

[](src/store/account.json ':include :type=code json')

* `_id`, identity of account
* `email`, as username
* `created`, created time
* `modifed`, last modifed time, such as change password
* `password`, bcrypt hashed of password
* `role`, checkout [Authorization](api_authorization.md)

# refresh_token

[](src/store/refresh_token.json ':include :type=code json')

* `_id` / identity of refresh token, it is also refresh token
* `account_id`, correspond account

# message

[](src/store/message.json ':include :type=code json')

* `_id`, identity of message
* `level` / integer, 0 is `info`, 1 is `debug`, 2 is `warn`, 3 is `error` and
  4 is `fatal`
* `label`, as group of message
* `created`, created time
* `content`, custom data

# error

[](src/store/error.json ':include :type=code json')

* `_id`, identity of error
* `created`, created time
* `req`, information about HTTP request
* `res`, information about HTTP response
* `front`, error information which sent to client
* `back`, HTTP error was throw
* `origin`, error which is throw before HTTP error if it is exists
