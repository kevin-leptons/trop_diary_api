## GET /message/item/:id

* authorization - `root` | `r`
* description - retrive specific log entry
* schema - [//trop/front/get_message_item](schema/front/schema.md#get_message_item)

**request**

```text
GET /message/item/5c4592923c60a2602be9dfd1
```

**response**

```json
{
    "_id": "5c4592923c60a2602be9dfd1",
    "level": 0,
    "message": "something happens",
    "ip": "::ffff:127.0.0.1",
    "created": 1548063378
}
```
