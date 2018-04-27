 
FROM node:9.2

WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .