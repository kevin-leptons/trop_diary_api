# Configuration Files

## /etc/trop_diary_api/conf.json

### Format

* `host` / string / `0.0.0.0`, host to bind on
* `port` / integer / `6969`, port to listen on
* `private_key` / string, path to private key file, relative path is parent
  directory of configuration file
* `store` / string / `mongodb://localhost/trop_diary_api`, URL refers
   to MongoDB server
* `root_email` / string / root@mail.com, as root username, will be create
  if username does not exists in database, the default password for root
  account is `goddamnit`

### Example

```json
{
    "host": "0.0.0.0",
    "port": 6969,
    "private_key": "private.pem",
    "store": "mongodb://localhost/trop_diary_api",
    "root_email": "root@mail.com"
}
```

## /etc/trop_diary_api/private.pem


### Format

See [Private Enhancec Mail](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail)

### How to Create

```bash
openssl genrsa -out private.pem 2048
```

### Example

```text
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA1ks13JnmvBDqylHuCrsEkXnkbo3Ph82g31LlR6YzqWxu1udI
Twjps/1OhcrS3F+ccRm6xUE3xVu0erhhOwH4sBBQGE2lRoLIRGTJJKzdd4l2h1KL
zZdlvhODGNUH8TftJLUjp4hEDTs5CJCZkkyz9IdFWE8YtWlnxngc9aD63cAeSg/p
Fy8YdC/GRJDSoG6q7D5WZrc4RaXmp9ei0m/an3AO68vbF4dwdMuJO2y48KEPJaIQ
i9B+7mNisedLmUSBgv8h2Foeg11fNC1t4Rw0b73pLHVdfd6/CTPQoPoebE1sTwWX
VL37lwPX7wL5kO/ceXYtFAFU/IMF/F8kfqDoWwIDAQABAoIBABMwxxELY0NiTHRz
49poJx+UB+XyoywpOQfm14uUEbpRcJekPLB/PtaUj6yhnkKH+W2TfUte7Myqyr3W
tzZeldPGkjWq9msbGS4uzGiRZn/m+oth1A1ESqM8Ahh+M2jhtkX8RsYhCN8ad6AR
uv8ECXWTi5098BuG5fk7FnTUxsKG4Pi+VVRylLFh6DDAbx5Z6UjvOcxYZ8oNtemr
gmUxK9BJ0rJ45e9jG1/CH95nSNd+HAZYuLZoO+0AJC0MQT/1ZHb0u5VGC6Wd1PCM
Fqb0fG2pxs5pcjGPeiT62tYO2zj+AWHtK8/DYVwI3XnRChuzvQBiEvUiq8TWkeDi
9HWl3QECgYEA8DLRad2xZjSku23DxAmcsKX1gjd2/7Q3AcwMGFwI62qyxIcZAG3G
DRQEoNMlylyDNzhWKB+oR4eZZ7H7vtlOG2pteV5JCgIx0cHrKyGPx+BVosd0d5+w
ix/xy7UNg7ifONgcrRj8xBfybXrvy1S/Hf+zxozchTDkUBBUdKW26oECgYEA5GQh
kwmDlCcXHyMFEchewIeafswYkL7n8C7TyDJJwMZ8hFmjFwT2AM4QgmcuDvQfyKPw
vdg/UelhotZgQuS/uckhUM1lLld+OtvnIcU2hYD14qxaa91/N1ZOMmuF9N519bPz
yZv4TWAAYdSrJwyb13bKPLApcIJebbZw9VmITNsCgYEAyH+S4EzGlOriivVf0Ra4
7ZdKbMzBj0YuGFjry7WfWGszF+sxSnNXO3l3N4uo4tcATKrA+DMcs8CTo8QkwLUB
hs763LGARFN6pH27QMB+FTjEIuFc7bGlmywqGIFj64zDk56JqU/PRhw7J3nUCiUO
dwsHVHgmZyNdoRtQdCITooECgYAiI2VxWQa16nHmUZG8arrfBGXvdgpl+GMq35UA
Y6PqkMCj99IM6szqqeKF225jBdKKZxbhCaXNVJkngeu5k/+kgY/dSBZLqwBPQ/d0
cMoJgpE+ZIzPerg9SUU+/Bt10prHMzLJe+rNhgAIn4VFvPi+aB8qmxpWmuYKeC7C
PbPF6QKBgF2PPqs1vauDu+1BnV95ZXt+DdCN8jiqiBjFB1meyNH52BXLTLz1Lq2U
SK7bM/rZiHZ1lQKcesZ2hPEtodxQxBDixNOreoFBeiA4MxBFHgEgyNBpmllmgYGb
zdK+x/Ipmx50F71difoKTz/abxBniepPcYsnXtX8Ffc4pn9VEtkA
-----END RSA PRIVATE KEY-----
```
