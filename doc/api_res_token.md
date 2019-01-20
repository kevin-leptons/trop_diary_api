# token

* endpoint - `/token`
* authentication - `no`
* description - token for authentication and authorization

## POST, grant_type=password

### Request

* schema - [//trop/front/post_token_req](../schema/front/post_token_req.json)
* example

```json
{
    "grant_type": "password",
    "username": "someone@mail.com",
    "password": "walkonthemoon"
}
```

### Response

* schema - [//trop/front/post_token_res](../schema/front/post_token_res.json)
* example

```json
{
    "type": "bearer",
    "expires_in": 20,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2x...",
    "refresh_token": "7fd15938c823cf58e78019bea2af142f9449696a"
}
```
* `type` - type of token, always is `bearer`
* `expires_in` - token will be expired in seconds
* `access_token` - [//trop/front/token](../schema/front/token.json),
  it is JSON Web Token, contain attributes
    * `role`, role of account
    * `iat`, dat which it is created
    * `exp`, datetime which it is expired
    * `iss`, who is created token
    * `sub`, account identity
* `refresh_token` - [//trop/front/refresh_token](../schema/front/refresh_token.json), a short token to get new token

## POST, grant_type=refresh_token

### Request

* schema - [//trop/front/post_token_req](../schema/front/post_token_req.json)
* example

```json
{
    "grant_type": "refresh_token",
    "refresh_token": "7fd15938c823cf58e78019bea2af142f9449696a"
}
```
### Response

It is the same with response of `grant_type=password`.

## References

* [RFC7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)
* [RFC6749 - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
