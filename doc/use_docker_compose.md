# Use via Docker Compose

## Files

* `deploy/`, root of deploy
* `deploy/trop_diary_api/`, configuration for service
* `deploy/trop_diary_api/conf.json`, configuration file
* `deploy/trop_diary_api/private.pem`, private key
* `deploy/docker_compose.yaml`

### deploy/trop_diary_api/conf.json

* format - checkout [Configuration File](conf_file.md)

### deploy/trop_diary_api/private.pem

* format - checkout [Configuration File](conf_file.md)

### deploy/docker_compose.yaml

* format - see [Dockercompose File References](https://docs.docker.com/compose/compose-file/)
* example

```yaml
version: '2.1'
services:
    trop_diary_api:
        image: trop/diary_api
        volumes:
            - ./trop_diary_api:/etc/trop_diary_api
        ports:
            - 6969:6969
```

## Start

```bash
docker-compose -f deploy/docker_compose.yaml up -d
```
