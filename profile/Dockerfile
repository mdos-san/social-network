FROM node:19-alpine

COPY ./ ./

RUN npm install
RUN npm run build

ENTRYPOINT npm run start
