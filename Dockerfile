FROM node:18.12.0-slim

WORKDIR /usr/app

COPY package.json ./
COPY .env         ./

RUN yarn

COPY . . 

EXPOSE 3000

CMD ["yarn", "run:dev"]