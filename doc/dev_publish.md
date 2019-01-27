# Publish

Befre publish, please check

* Update changes in `changelog.md`
* Up version in `package.json`

## To Debian Package

Work on Debian-like operating system

```bash
./dist_deb.sh
```

* Result will put into `dist/` directory

## To Docker Hub Registry

```bash
docker build -t trop/diary_api .
docker tag trop/diary_api trop/diary_api:VERSION
docker push trop/diary_api:VERSION
```
