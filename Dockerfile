FROM node:12.5-alpine

RUN apk update && apk add --no-cache \
    bash \
    git \
    openssh \
    tzdata

COPY wait.sh /wait

COPY package*.json ./

# solution for core-js postinstall script hang up
# https://github.com/zloirock/core-js/issues/673#issuecomment-550199917
RUN npm config set unsafe-perm true
RUN ADBLOCK=1 npm i --production

COPY .sequelizerc .sequelizerc
COPY etc etc
COPY lib lib
COPY static static
COPY migrations migrations
COPY runner.js runner.js
COPY app.js app.js

## Launch the wait tool and then your application
CMD /wait && npm run migration-production && npm start
