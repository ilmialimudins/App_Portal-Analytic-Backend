FROM node:18 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:lts-slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --production --frozen-lockfile --ignore-script

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env ./

CMD [ "node", "dist/main.js" ]
