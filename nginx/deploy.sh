#!/usr/bin/env sh

# получаем токен в виде iamToken: XXX
TOKEN=$(curl -d "{\"yandexPassportOauthToken\":\"${OAUTH}\"}" "https://iam.api.cloud.yandex.net/iam/v1/tokens" | grep 'iamToken')

# достаем только значение токена
IAM_TOKEN=$(echo "${TOKEN}"  | awk '{print $2}' | sed 's/^"\(.*\)",*/\1/')

mkdir certs
cd ./certs

# жуткие костыли для работы с json и jq
curl -H "Authorization: Bearer ${IAM_TOKEN}" https://data.certificate-manager.api.cloud.yandex.net/certificate-manager/v1/certificates/${CERTIFICATE_ID}:getContent | jq -r '.privateKey'  | sed 's/\\[tn]//g; s/"\(.*\)"/\1/' > key.txt
sed -i '' -e '$ d' key.txt
curl -H "Authorization: Bearer ${IAM_TOKEN}" https://data.certificate-manager.api.cloud.yandex.net/certificate-manager/v1/certificates/${CERTIFICATE_ID}:getContent | jq -r '.certificateChain.[0]'  | sed 's/\\[tn]//g; s/"\(.*\)"/\1/' > bundle.crt
sed -i '' -e '$ d' bundle.crt
curl -H "Authorization: Bearer ${IAM_TOKEN}" https://data.certificate-manager.api.cloud.yandex.net/certificate-manager/v1/certificates/${CERTIFICATE_ID}:getContent | jq -r '.certificateChain.[1]'  | sed 's/\\[tn]//g; s/"\(.*\)"/\1/' >> bundle.crt
sed -i '' -e '$ d' bundle.crt

echo "${OAUTH}" | docker login --username oauth --password-stdin cr.yandex

docker build ./ -t cr.yandex/${REGISTRY_ID}/sportsmap-nginx:v${VERSION}

docker push cr.yandex/${REGISTRY_ID}/sportsmap-nginx:v${VERSION}