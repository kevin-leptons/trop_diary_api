# message

* endpoint - `/message`
* description - log message

## Attributes

* `_id` - identity
* `ip` - internet address where write message
* `date` - datetime when message is write
* `level` - level of message
* `label` - group of message
* `message` - content of message

## GET

### Request

* schema - [//trop/front/get_message_req](../schema/front/get_message_req.json)
* example

```bash
GET /message?q=hellop=2&s=8
```

* `q`, keyword for searching
* `p`, page index
* `s`, number of items in a page

### Response

* schema - [//trop/front/get_message_res](../schema/front/get_message_res)
* example

```json
[
    {
        "_id": "5c401bc545d6272171bbaa46",
        "level": "info",
        "message": "something happens"
    },
    {
        "_id": "7c401bc545d6272171bbaa46",
        "level": "warn",
        "message": "something went wrong"
    }
]
```

## POST

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

* schema - [//trop/front/post_message_res](../schema/front/post_message_res)
* example

```json
{
    "_id": "5c401bc545d6272171bbaa46"
}
```
