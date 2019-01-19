# token

* endpoint - `/token`
* description - token for authentication and authorization

## POST

### Request

* schema - [//trop/front/post_token_req](../schema/front/post_token_req.json)
* example

```json
{
    "email": "someone@mail.com",
    "password": "walkonthemoon"
}
```

### Response

* schema - [//trop/front/post_token_res](../schema/front/post_token_res.json)
* example

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2x..."
}
```

* `token` - [//trop/front/token](../schema/front/token.json),
  it is JSON Web Token, contain attributes
    * `role`, role of account
    * `iat`, datetime which it is created
    * `exp`, datetiem which it is expired
    * `iss`, who is created token
    * `sub`, account identity
