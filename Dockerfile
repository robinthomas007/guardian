FROM node:9 as builder

WORKDIR /src

COPY . .

RUN npm install && npm run build

FROM nginx:1 as app

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY /src/mockData.json /usr/share/nginx/html/

COPY --from=builder /src/build /usr/share/nginx/html/

