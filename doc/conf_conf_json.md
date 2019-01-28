# /etc/trop_diary_api/conf.json

```json
{
    "host": "0.0.0.0",
    "port": 6969,
    "private_key": "private.pem",
    "store": "mongodb://localhost/trop_diary_api",
    "root_email": "root@mail.com"
}
```

* `host` / string / `0.0.0.0`, host to bind on
* `port` / integer / `6969`, port to listen on
* `private_key` / string, path to private key file, relative path is start from
  parent directory of configuration file
* `store` / string / `mongodb://localhost/trop_diary_api`, URL refers
   to MongoDB server
* `root_email` / string / root@mail.com, as root username, will be create
  if username does not exists in database, the default password for root
  account is `goddamnit`
