FROM node:10.16.0-alpine

ENV NODE_ENV production

WORKDIR /opt/trop_diary_api
COPY . .

RUN npm i --only production
RUN npm link

CMD ["trop-diary-api", "start"]
