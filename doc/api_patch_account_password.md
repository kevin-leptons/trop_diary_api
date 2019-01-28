# PATCH /account/password

* authorization - `no`
* description - change account password
* schema - [//trop/front/patch_account_password](schema/front/schema.md#patch_account_password)

**request**

```json
{
    "email": "root@mail.com",
    "old_password": "noob password",
    "new_password": "better password"
}
```

**response**

`none`
