# POST /key

* authentication - `root`
* description - create a key for `server-server` side
* schema - [//trop/front/post_key](schema/front/schema.md#post_key)

**request**

```json
{
    "role": "w"
}
```

**response**

```json
{
    "type": "key",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 0
}
```
