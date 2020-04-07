FROM node:carbon-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
EXPOSE 9006
