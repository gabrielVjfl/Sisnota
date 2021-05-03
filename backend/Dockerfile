FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm

COPY . . 

EXPOSE 8085

CMD npm start