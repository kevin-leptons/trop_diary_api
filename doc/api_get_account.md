# GET /account

* authorization - `root`
* description - list accounts
* schema - [//trop/front/get_account](schema/front/schema.md#get_account)

**request**

```bash
GET /account&q=mail&p=2
```

**response**

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
