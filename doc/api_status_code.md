# Error Handling

## 200

* Successful by `GET`, `PUT`, `PATCH` and `DELETE`

## 201

* Successful by `POST`
* Server return `_id` as identity of resource

## 400 - Bad Request

* Data from client is invalid format
* Return information show how data is invalid

## 401 - Unauthorized

* Action requires authorization, see [Auth](api_auth.md)

## 403 - Forbiden

* Action requires permission, account does not have it

## 409 - Conflict

* Resource is already existed

## 500 - Internal Server Error

* Unexpected errors has been occurs on server side
* Server returns `log_id` to trace that error
* With database, on document `system`, find a document with `_id` = `log_id`
