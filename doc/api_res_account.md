# account

* endpoint - `/account`
* authentication - `yes`
* description - account in system

## GET /account

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
    {
        "_id": "18cbf28e-b878-42c1-8d0f-89bfb9996629",
        "email": "root@mail.com",
        "role": "root",
        "created": 1548499673,
        "modified": 1548499673
    },
    {
        "_id": "18cbf28e-b878-42c1-8d0f-89bfb9996629",
        "email": "reader@mail.com",
        "role": "r",
        "created": 1548499673,
        "modified": 1548499673
    }
]
```

* `_id`, account identity
* `email`, email as username
* `role`, role of account
* `created`, created date
* `modified`, last modified date

## POST /account

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
    "_id": "18cbf28e-b878-42c1-8d0f-89bfb9996629"
}
```

* `_id` - identity of account

## PATCH /account/password

* authorization - `no`
* description - change password

### Request

* schema - [//trop/front/patch_account_password_req](../schema/front/patch_account_password_req.json)
* example

```json
{
    "email": "root@mail.com",
    "old_password": "noob password",
    "new_password": "better password"
}
```

### Response

* schema - `none`

## PATCH /account/role

* authorization - `root`
* description - change account's role, granted token still is valid for about
  4 hours

### Request

* schema - [//trop/front/patch_account_role_req](../schema/front/patch_account_role_req.json)
* example

```json
{
    "email": "someone@mail.com",
    "role": "rw"
}
```

### Response

* schema - `none`

## DELETE /account/item/:username

* authorization - `root`
* description - remove an account, granted token still is valid for about
  4 hours

### Request

* schema - [//trop/front/del_account_req](../schema/front/del_account_req)
* example

```bash
DELETE /account/item/reader@mail.com
```

### Response

* schema - `none`
