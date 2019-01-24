FROM node:10

WORKDIR /opt/trop_diary_api
COPY . .

RUN npm i --only production
RUN npm link

CMD ["trop-diary-api", "start"]
