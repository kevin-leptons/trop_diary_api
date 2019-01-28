# http_204

[](../src/front/http_204.json ':include :type=code json')

# http_4xx

[](../src/front/http_4xx.json ':include :type=code json')

# access_token

[](../src/front/access_token.json ':include :type=code json')

# access_token_key

[](../src/front/access_token_key.json ':include :type=code json')

# post_token

[](../src/front/post_token.json ':include :type=code json')

* `res.body`
    * `type` - type of token, always is `bearer`
    * `expires_in` - token will be expired in seconds
    * `access_token` - [//trop/front/token](../schema/front/token.json),
      it is JSON Web Token, contain attributes
        * `role`, role of account
        * `iat`, dat which it is created
        * `exp`, datetime which it is expired
        * `iss`, who is created token
        * `sub`, account identity
    * `refresh_token` - [//trop/front/refresh_token](../schema/front/refresh_token.json),
      a token to get new access_token

# post_key

[](../src/front/post_key.json ':include :type=code json')

* `req.body`
    * `role`, role for key
* `res.body`
    * `type`, kind of authentication
    * `access_token`, for authorization
    * `expires_in`, never expired

# get_root

[](../src/front/get_root.json ':include :type=code json')

* `res.body`
    * `name`, name of service.
    * `version`, version of service.
    * `description`, short description about service.
    * `message_count`, estimate total of log messages in system.

# get_account

[](../src/front/get_account.json ':include :type=code json')

* `req.query`
    * `q`, keyword to search on `email`
    * `p`, page index
* `res.body`
    * `_id`, account identity
    * `email`, email as username
    * `role`, role of account
    * `created`, created date
    * `modified`, last modified date

# post_account

[](../src/front/post_account.json ':include :type=code json')

* `res.body`
    * `_id` - identity of account

# patch_account_password

[](../src/front/patch_account_password.json ':include :type=code json')

# patch_account_role

[](../src/front/patch_account_role.json ':include :type=code json')

# del_account

[](../src/front/del_account.json ':include :type=code json')

## get_message

[](../src/front/get_message.json ':include :type=code json')

* `req.query`
    * `p` - page index
    * `ll` - lower bound of `level`
    * `ul` - upper bound of `level`
    * `lc` - lower bound of `created`
    * `uc` - upper bound of `created`
    * `l` - label

# get_message_item

[](../src/front/get_message_item.json ':include :type=code json')

* `req.param`
    * `id` - identity of message

# post_message

[](../src/front/post_message.json ':include :type=code json')
