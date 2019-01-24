# key

* endpoint - `/key`
* authentication - `root`
* description - key for authentication and authorization, use for
  `server-server` side

## POST /key

### Request

* schema - [//trop/front/post_key_req](../schema/front/post_key_req.json)
* example

```json
{
    "role": "w"
}
```

* `role`, role for key

### Response

* schema - [//trop/front/post_key_res](../schema/front/post_key_res.json)
* example

```json
{
    "type": "key",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 0
}
```

* `type`, kind of authentication
* `access_token`, for authorization
* `expires_in`, never expired
