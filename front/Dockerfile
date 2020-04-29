FROM node:13.13.0-stretch

# set working directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm i
RUN npm rebuild node-sass

COPY . /usr/src/app

EXPOSE 3000