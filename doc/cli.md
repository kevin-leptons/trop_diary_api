# Command Line

```text
start  Online
====

start [--conf-file value] [--clean]

    * --conf-file / string / '/etc/trop_diary_api/conf.json', path to
      configuration file
    * --clean, clean all of database
```

## Configuration File

**Syntax**

* `host` / string, host to bind on
* `port` / integer, port to listen on
* `private_key` / string, path to private key file, relative path is parent
  directory of configuration file
* `store` / string, URL refers to MongoDB server
* `root_email` / string, as root username, will be create if username does not
  exists in database

**Example**

```json
{
    "host": "0.0.0.0",
    "port": 80,
    "private_key": "private.pem",
    "store": "mongodb://localhost/trop_api",
    "root_email": "root@mail.com"
}
```
