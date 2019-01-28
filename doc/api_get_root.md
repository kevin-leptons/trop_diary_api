# GET /

* authentication - `no`
* description - essential information of system
* schema - [//trop/front/get_root](schema/front/schema.md#get_root)

**request**

```text
GET /
```

**response**

```json
{
    "name":"@trop/diary_api",
    "version":"0.1.0",
    "description":"Logging service API",
    "message_count":21
}
```
