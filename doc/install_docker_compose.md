# Install via Docker Compose


* `deploy/`, root of deploy directory
* `deploy/docker_compose.yaml`
* `deploy/trop_diary_api/`
* `deploy/trop_diary_api/conf.json`, checkout
  [/etc/trop_diary_api/conf.json](conf_conf_json.md)
* `deploy/trop_diary_api/private.pem`, checkout
  [/etc/trop_diary_api/private.pem](conf_private_pem.md)

**deploy/trop_diary_api/conf.json**

```yaml
version: '3.1'
services:
    trop_diary_api:
        image: trop/diary_api
        volumes:
            - ./trop_diary_api:/etc/trop_diary_api
        ports:
            - 6969:6969
```
