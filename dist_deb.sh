#!/usr/bin/env bash

PKG_NAME="trop-diary-api"
PKG_VERSION="0.11.0"

rm -rf dest

# library
mkdir -vp dest/opt/trop_diary_api
npm i --only production
cp -r bin lib schema node_modules package.json \
    dest/opt/trop_diary_api

# configurations

mkdir -vp dest/etc/trop_diary_api
cp deb/conf.json dest/etc/trop_diary_api

# systemd
mkdir -vp dest/etc/systemd/system
cp deb/trop-diary-api.service dest/etc/systemd/system

# package specification
cp -r deb dest/DEBIAN
rm dest/DEBIAN/trop-diary-api.service
sed -i -e "s/\$PKG_NAME/${PKG_NAME}/g" dest/DEBIAN/control
sed -i -e "s/\$PKG_VERSION/${PKG_VERSION}/g" dest/DEBIAN/control

# build
mkdir -vp dist
dpkg-deb --build -D dest/ dist/${PKG_NAME}_${PKG_VERSION}-0_all.deb
