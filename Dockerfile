FROM node:18.8

WORKDIR /opt/njcdd/account-api
ENV NJCDD_ACCOUNT_API_PORT=12100 \
    NODE_ENV=production
EXPOSE 12100

# Install app dependencies
COPY package.json ./

RUN yarn install

COPY . .

CMD [ "start", "./bin/www" ]
