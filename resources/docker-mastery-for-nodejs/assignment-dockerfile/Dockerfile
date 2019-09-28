FROM node:10.15-alpine

EXPOSE 3000

# https://github.com/krallin/tini#alpine-linux-package
RUN apk add --no-cache tini

WORKDIR /app

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

# ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "app.js"]