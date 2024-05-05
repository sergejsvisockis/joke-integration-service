FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json ./package-lock.json ./

RUN npm install
RUN npx prisma generate

COPY ./ .
EXPOSE 3000
CMD npx prisma migrate dev && npm run start
