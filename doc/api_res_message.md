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

* `p`, page index

### Response

* schema - [//trop/front/get_message_res](../schema/front/get_message_res.json)
* example

```json
[
    {
        "_id": "5c4187d01263114cb890ce63",
        "level": "info",
        "message": "something happens",
        "ip": "127.0.0.1",
        "date": "2019-01-18T08:01:20.882Z"
    },
    {
        "_id": "5c4187d11263114cb890ce64",
        "level": "warn",
        "message": "something went wrong",
        "ip": "127.0.0.1",
        "date": "2019-01-18T08:01:21.743Z"
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
    "level": "info",
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
