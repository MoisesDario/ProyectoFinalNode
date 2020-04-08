FROM node:carbon-alpine AS builder
WORKDIR /usr/src/app/node
COPY package*.json ./
COPY . .

FROM builder AS desarrollo
RUN npm install
CMD ["node","src"]
EXPOSE 9007

FROM builder AS production
RUN npm install --production
RUN npm install aws-sdk
CMD ["npm","run","start"]
EXPOSE 8080