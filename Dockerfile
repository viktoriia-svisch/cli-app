FROM node:15.4.0-alpine3.12 AS build-env
WORKDIR /app
ADD . /app
RUN cd /app && npm i && npm run build
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-env /app/dist /var/www/html
EXPOSE  80
