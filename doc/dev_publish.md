# Publish

## To NPM Registry

* Update changes in `changelog.md`
* Up version in `package.json`
* Run `npm publish` to push new version to `npm registry`.

## To Docker Hub Registry

```bash
docker build -t trop/diary_api .
docker tag trop/diary_api trop/diary_api:VERSION
docker push trop/diary_api:VERSION
```
