FROM node:23-alpine3.20

WORKDIR /cat-community

COPY cat-community/package.json package.json
COPY cat-community/package-lock.json package-lock.json

RUN npm install

COPY ./cat-community .

CMD ["node", "server.js"]