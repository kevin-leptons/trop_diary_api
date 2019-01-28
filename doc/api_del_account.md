# DELETE /account/item/:username

* authorization - `root`
* description - remove an account, granted token still is valid until
  expired
* schema - [//trop/front/del_account](schema/front/schema.md#del_account)

**request**

```text
DELETE /account/item/reader@mail.com
```

**response**

`none`
