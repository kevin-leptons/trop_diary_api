# Use via NPM Registry

## Install

```bash
npm install -g @trop/diary_api
```

## Files

### /etc/trop_diary_api/private.pem

```bash
openssl genrsa -out /etc/trop_diary_api/private.pem 2048
```

### /etc/trop_diary_api/conf.json

```json
{
    "host": "0.0.0.0",
    "port": 8080,
    "private_key": "private.pem",
    "store": "mongodb://USER:PASSWORD@MONGODB_SERVER/trop_diary_api",
    "root_email": "root@mail.com"
}
```

* Replace `MONGODB_SERVER` with correct host name
* Replace `USER` and `PASSWORD` with correct values.

### /etc/systemd/system/trop_diary_api.service

```text
[Unit]
Description=Logging Service
After=network.target

[Service]
Restart=always
ExecStart=/usr/bin/trop-diary-api start
```

## Start

```bash
systemctl daemon-reload
systemctl start trop_diary_api.service
```

As configurations, this is root account

* username: root@mail.com
* password: goddamnit

## More

* Use [@trop/diary_cli](https://github.com/kevin-leptons/trop_diary_cli)
  to change password and retrieve messages
* Use [@trop/diary_nodejs](https://github.com/kevin-leptons/trop_diary_nodejs)
  to write mesages on applications
