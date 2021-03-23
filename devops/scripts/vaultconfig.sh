#!/bin/bash

export VAULT_ADDR=https://vault.umusic.net

if [[ -z $VAULT_TOKEN ]]; then
    CLUSTER_NAME="aws44-global-tools"
    KUBE_TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
    export VAULT_TOKEN=$(curl --request POST \
        --data '{"jwt": "'"$KUBE_TOKEN"'", "role": "guardian-cicd"}' \
        ${VAULT_ADDR}/v1/auth/${CLUSTER_NAME}/login | jq -r '.auth.client_token')
fi
if [[ -z "$VAULT_TOKEN" ]]; then
    echo "VAULT_TOKEN required" >&2
    exit 1
fi

envSecrets() {
    VAULT_KV="guardian"
    VAULT_KV_PATH="guardian-ui/$1"
    VAULT_OUTPUT=$(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" -X GET $VAULT_ADDR/v1/${VAULT_KV}/data/${VAULT_KV_PATH})
    if [[ "$(echo $VAULT_OUTPUT | jq -r '.errors')" != "null" ]]; then
        echo Error from Vault $VAULT_ADDR/v1/${VAULT_KV}/data/${VAULT_KV_PATH}
        echo $VAULT_OUTPUT
        exit 1
    fi
    echo "window.env = $(echo "$VAULT_OUTPUT" | jq -r '.data.data')" >public/static/config/index.$1.js
}

ENVS=(dev prod qa sandbox stage test)

for e in ${ENVS[@]}; do
    envSecrets $e
done
