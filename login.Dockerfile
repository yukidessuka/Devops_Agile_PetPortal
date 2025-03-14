FROM node:23-alpine3.20

WORKDIR /login

COPY login/package.json package.json
COPY login/package-lock.json package-lock.json

RUN npm install

COPY ./login .

CMD ["node", "server.js"]