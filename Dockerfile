FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --only=development

COPY . .

RUN npm run start:dev