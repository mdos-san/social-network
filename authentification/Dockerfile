FROM node:19-alpine

COPY api ./api
COPY core ./core
COPY database ./database
COPY runner ./runner
COPY index.js .
COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm run build

ENTRYPOINT npm run start
