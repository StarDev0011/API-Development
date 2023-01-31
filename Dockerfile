### BASE ###
FROM node:18.13-buster-slim as base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl curl


### BUILDER ###
FROM base as builder

WORKDIR /opt/njcdd/account-api
ENV NJCDD_ACCOUNT_API_PORT=12100 \
    NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build
RUN yarn test

FROM node:18.8

WORKDIR /opt/njcdd/account-api
ENV NJCDD_ACCOUNT_API_PORT=12100 \
    NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /opt/njcdd/account-api/build ./build

EXPOSE 12100
CMD [ "node", "build/src/server.js" ]
