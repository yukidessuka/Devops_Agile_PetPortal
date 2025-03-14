FROM node:23-alpine3.20

WORKDIR /cart

COPY cart/package.json package.json
COPY cart/package-lock.json package-lock.json

RUN npm install

COPY ./cart .

CMD ["node", "server.js"]