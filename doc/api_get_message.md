# GET /message

* authorization - `root` | `r`
* description - retrive list messages
* schema = [//trop/front/get_message](schema/front/schema.md#get_message)

**request**

```text
GET /message?q=hellop=2&s=8
```

**response**

```json
[
    {
        "_id": "5c4592923c60a2602be9dfd1",
        "level": 0,
        "message": "something happens",
        "ip": "::ffff:127.0.0.1",
        "created": 1548063378
    },
    {
        "_id": "5c4592923c60a2602be9dfd2",
        "level": 1,
        "message": "something happens",
        "ip": "::ffff:127.0.0.1",
        "created": 1548063378
    }
]
```
