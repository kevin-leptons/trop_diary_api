#!/usr/bin/env bash

PKG_NAME="trop-diary-api"
PKG_VERSION="0.11.0"

mkdir -vp dest/opt/trop_diary_api
npm i --only production
cp -r bin lib schema node_modules package.json \
    dest/opt/trop_diary_api

mkdir -vp dest/etc/systemd/system
cp deb/trop_diary_api.service dest/etc/systemd/system/trop_diary_api.service

mkdir -vp dest/DEBIAN
cp deb/control dest/DEBIAN/control
sed -i -e "s/\$PKG_NAME/${PKG_NAME}/g" dest/DEBIAN/control
sed -i -e "s/\$PKG_VERSION/${PKG_VERSION}/g" dest/DEBIAN/control

mkdir -vp dist
dpkg-deb --build -D dest/ dist/${PKG_NAME}_${PKG_VERSION}-0_all.deb
