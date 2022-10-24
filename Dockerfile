FROM node:16.18-alpine3.16 as development

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]


FROM node:16.18-alpine3.16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

RUN npm i -g typescript

RUN npm i -g ts-node

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main" ]
