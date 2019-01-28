# PATCH /account/role

* authorization - `root`
* description - change account's role, granted token is still valid until
  expired
* schema - [//trop/front/patch_account_role](schema/front/schema.md#patch_account_role)

**request**

```json
{
    "email": "someone@mail.com",
    "role": "rw"
}
```

**response**

`none`
