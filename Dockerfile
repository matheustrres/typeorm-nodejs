FROM node:18.12.0-slim

USER node
WORKDIR /usr/app

COPY package.json ./
COPY .env         ./

RUN yarn install --production=true

COPY . . 

EXPOSE 3000

CMD ["yarn", "run:dev"]