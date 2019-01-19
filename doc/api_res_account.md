# account

* endpoint - `/account`
* description - account in system

## POST

### Request

* schema - [//trop/front/post_account_req](../schema/front/post_account_req.md)
* example

```json
{
    "email": "someone@mail.com",
    "password": "walkonthemoon"
}
```

### Response

* schema - [//trop/front/post_account_res](../schema/front/post_account_res.json)
* example

```json
{
    "_id": "5c42d0e4a0a798428f4c0cb0"
}
```

* `_id` - identity of account
