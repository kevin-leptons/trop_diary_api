# message

* endpoint - `/message`
* authentication - `yes`
* description - log message

## Attributes

* `_id` - identity
* `ip` - internet address where write message
* `date` - datetime when message is write
* `level` - level of message
* `label` - group of message
* `message` - content of message

## GET

* authorization - `root`, `r`

### Request

* schema - [//trop/front/get_message_req](../schema/front/get_message_req.json)
* example

```bash
GET /message?q=hellop=2&s=8
```

* `p` - page index
* `ll` - lower bound of `level`
* `ul` - upper bound of `level`
* `lc` - lower bound of `created`
* `uc` - upper bound of `created`
* `l` - label

### Response

* schema - [//trop/front/get_message_res](../schema/front/get_message_res.json)
* example

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

## POST

* authorization - `root`, `w`

### Request

* schema - [//trop/front/post_message_req](../schema/front/post_message_req.json)
* example

```json
{
    "level": 0,
    "message": "something happens"
}
```

### Response

* schema - [//trop/front/post_message_res](../schema/front/post_message_res.json)
* example

```json
{
    "_id": "5c401bc545d6272171bbaa46"
}
```
