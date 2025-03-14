FROM node:23-alpine3.20

WORKDIR /appointment

COPY appointment/package.json package.json
COPY appointment/package-lock.json package-lock.json

RUN npm install

COPY ./appointment .

CMD ["node", "app.js"]