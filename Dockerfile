### BASE ###
FROM node:18.13-buster-slim as base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl curl && apt-get autoremove --yes

### BUILDER ###
FROM base as builder

RUN mkdir -p /opt/njcdd/account-api/build
WORKDIR /opt/njcdd/account-api
ENV NJCDD_ACCOUNT_API_PORT=12100 \
    NJCDD_MONGODB_URI="mongodb://localhost:27017/njcdd" \
    NJCDD_API_DATAPATH="/opt/njcdd/account-api/build/data/source" \
    NODE_ENV=test

COPY package.json tsconfig.json tsoa.json yarn.lock ./
RUN yarn install --production=false --frozen-lockfile --non-interactive

COPY . .
RUN yarn build && yarn test


### RUNNER ###
FROM builder as runner

RUN mkdir -p /opt/njcdd/account-api/build
WORKDIR /opt/njcdd/account-api
ENV NJCDD_ACCOUNT_API_PORT=12100 \
    NJCDD_MONGODB_URI="mongodb://localhost:27017/njcdd" \
    NJCDD_API_DATAPATH="/opt/njcdd/account-api/build/data/source" \
    NODE_ENV=test

COPY package.json tsconfig.json tsoa.json yarn.lock ./
RUN yarn install --production --pure-lockfile --non-interactive
COPY --from=builder /opt/njcdd/account-api/build ./build

EXPOSE 12100
CMD [ "node", "build/src/server.js" ]
