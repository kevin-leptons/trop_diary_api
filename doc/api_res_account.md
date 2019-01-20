# account

* endpoint - `/account`
* authentication - `yes`
* description - account in system

## GET

* authorization - `root`
* description - list accounts

### Request

* schema - [//trop/front/get_account_req](../schema/front/get_account_req.json)
* example

```bash
GET /account&q=mail&p=2
```

* `q`, keyword to search on `email`
* `p`, page index.

### Response

* schema - [//trop/front/get_account_res](../schema/front/get_account_res.json)
* example

```json
[
    {},
    {}
]
```

* `_id`, account identity
* `email`, email as username
* `role`, role of account
* `created`, created date
* `modified`, last modified date

## POST

* authorization - `root`
* description - create a new account, a random password will be return

### Request

* schema - [//trop/front/post_account_req](../schema/front/post_account_req.json)
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

## PATCH /password

* authentication - `any`
* description - change password

### Request

* schema - [//trop/front/patch_account_password_req](../schema/front/patch_account_password_req.json)
* example

```json
{
    "old_password": "noob password",
    "new_password": "better password"
}
```

### Response

* schema - `none`

## PATCH /role

* authorization - `root`
* description - change account's role, granted token still is valid for about
  4 hours

### Request

* schema - [//trop/front/patch_account_role_req](../schema/front/patch_account_role_req.json)
* example

```json
{
    "role": "rw"
}
```

### Response

* schema - `none`

## DELETE /item/:id

* authorization - `root`
* description - change account's role, granted token still is valid for about
  4 hours

### Request

* schema - `none`.
* example

```bash
DELETE /account/item/5c42d0e4a0a798428f4c0cb0
```

### Response

* schema - `none`
