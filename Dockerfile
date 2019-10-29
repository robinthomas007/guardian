FROM node:9 as builder

WORKDIR /src

ARG NODE_ENV
ARG NODE_PATH
ARG VAULT_USER
ARG VAULT_PASS
ARG VAULT_ADDR
ARG VAULT_METHOD

ENV NODE_ENV=$NODE_ENV
ENV NODE_PATH=$NODE_PATH
ENV VAULT_USER=$VAULT_USER
ENV VAULT_PASS=$VAULT_PASS
ENV VAULT_ADDR=$VAULT_ADDR
ENV VAULT_METHOD=$VAULT_METHOD

COPY . .

RUN ./scripts/build.sh

FROM nginx:1 as app

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /src/app-dist /tmp

COPY --from=builder /src/scripts/deploy-env.sh deploy-env.sh

ENTRYPOINT ["./deploy-env.sh"]
