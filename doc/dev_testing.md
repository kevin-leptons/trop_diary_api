# Test

* local test

```bash
npm test
```

* try start daemon

```bash
sudo npm link

sudo mkdir -p /etc/trop_diary_api
sudo openssl genrsa -out /etc/trop_diary_api/private.pem 2048

sudo ln -s "$PWD/package/trop_diary_api.service" /etc/systemd/system/trop_diary_api.service
sudo systemctl daemon-reload

sudo systemctl start trop_diary_api.service
```

* private key for daemon

```bash

```
