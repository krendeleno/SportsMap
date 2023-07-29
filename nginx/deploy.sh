#!/usr/bin/env sh

echo "${OAUTH}" | docker login --username oauth --password-stdin cr.yandex

docker build ./ -t cr.yandex/${REGISTRY_ID}/sportsmap-nginx:v${VERSION}

docker push cr.yandex/${REGISTRY_ID}/sportsmap-nginx:v${VERSION}