# POST /token

* authentication - `no`
* description - create a token
* schema - [//trop/front/post_token](schema/front/schema.md#post_token)

## Create Token from Password

**request**

```json
{
    "grant_type": "password",
    "username": "someone@mail.com",
    "password": "walkonthemoon"
}
```

**response**

```json
{
    "type": "bearer",
    "expires_in": 14400,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "2619ad6d-cbb1-4fdd-9fca-70652b87276f"
}
```

## Create Token from Refresh Token

**request**

```json
{
    "grant_type": "refresh_token",
    "refresh_token": "2619ad6d-cbb1-4fdd-9fca-70652b87276f"
}
```

**response**

It is similar as [Create Token from Password](#create-token-from-password)

## References

* [RFC7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)
* [RFC6749 - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
