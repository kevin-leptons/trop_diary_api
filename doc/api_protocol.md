# Protocol

APIs build on top of HTTP Protocol.

## Methods

There are six methods on APIs

* `GET`, retrive data
* `POST`, create or store a new data
* `PUT`, update entire a data entry
* `PATCH`, update patrial a data entry
* `DELETE`, remove a data entry
* `OPTION`, pool for Cross Origin Resource Sharing in Web Browser

## Status Codes

* `200` / `OK`, general success from `GET` or `OPTION`
* `201`, `Created` from `POST`, API also returns `_id` as identity of new  
   resource
* `204` / `No Content`, general success from `PUT`, `PATCH` or `DELETE`, API
  does not return any data
* `400` / `Bad Request`, input data from client is invalid
* `401` / `Unauthorized`, action require client to be authenticated, but client
  does not
* `403` / `Forbiden`, action require client to be authorized, but client
  does not
*  `409` / `Conflict`, create resource which is already existed
* `500` / `Internal Server Error`, unexpected error has been occurs on server
  side

In all error case `4xx` and `5xx`, an message is return to client to help
trace error, for example

```json
{
    "log_id": "748f1606-061e-4f4a-8e7f-75cd374119ea",
    "error": "Your input is invalid"
}
```

* `log_id` / `UUID`, identity of log message on server, find a record from
  document `error` in database to know what is happen
* `error` / any, an short message show what is happen, this attribute is not
  available for error with status code `5xx`
