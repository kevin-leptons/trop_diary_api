# POST /account

* authorization - `root`
* description - create a new account
* schema - [//trop/front/post_account](schema/front/schema.md#post_account)

**request**

```json
{
    "email": "someone@mail.com",
    "password": "walkonthemoon"
}
```

**response**

```json
{
    "_id": "18cbf28e-b878-42c1-8d0f-89bfb9996629"
}
```
