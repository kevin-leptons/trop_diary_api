#!/usr/bin/env bash

IMAGE="trop/diary_api"

docker build -f dockerfile -t "$IMAGE" .
