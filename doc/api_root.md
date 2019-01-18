# Endpoint: /

## GET

### Request

* schema - `NO`

### Response

* schema - [//trop/front/get_root_res](../schema/front/get_root_res.json)
* example

```json
{
    "name":"@trop/diary_api",
    "version":"0.1.0",
    "description":"Logging service API",
    "message_count":21
}
```

* `name`, name of service.
* `version`, version of service.
* `description`, short description about service.
* `message_count`, estimate total of log messages in system.
