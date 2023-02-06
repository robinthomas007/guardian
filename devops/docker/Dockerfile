FROM node:15 as builder

ARG VAULT_TOKEN
ENV VAULT_TOKEN=${VAULT_TOKEN}

WORKDIR /src 

RUN apt-get update -y && apt-get install -y jq

COPY . .

RUN npm ci --ignore-scripts

ENV NODE_PATH=src
RUN --mount=type=secret,id=serviceaccount_token,target=/var/run/secrets/kubernetes.io/serviceaccount/token \
    bash devops/scripts/vaultconfig.sh && \
    npm run build

FROM docker-registry.umusic.com/swift/nginx-base-aws:1.18-0.0.1 as app

COPY --from=builder /src/build/ /usr/share/nginx/html/

COPY devops /opt/devops

ENTRYPOINT [ "bash", "/opt/devops/scripts/entrypoint.sh" ]
