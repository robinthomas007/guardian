FROM node:9 as builder

WORKDIR /src

COPY . .

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

RUN ./scripts/build.sh

FROM nginx:1 as app

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY /src/mockData.json /usr/share/nginx/html/

COPY --from=builder /src/build /usr/share/nginx/html/

