FROM node:8-slim as base

LABEL org.opencontainers.image.authors=gdfreitasdev@gmail.com
LABEL org.opencontainers.image.title="Ultimate Node.js Dockerfile"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.bretfisher.nodeversion=$NODE_VERSION

ENV NODE_ENV=production

EXPOSE 80
WORKDIR /app
COPY package*.json ./
RUN npm config list
RUN npm ci \
    && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
CMD ["node", "server.js"]

# Development Stage
FROM base as dev
ENV NODE_ENV=development
RUN apt-get update -qq && apt-get install -qy \ 
    ca-certificates \
    bzip2 \
    curl \
    libfontconfig \
    --no-install-recommends
RUN npm config list
RUN npm install --only=development \
    && npm cache clean --force
CMD ["nodemon", "server.js"]

# Test Stage
FROM dev as test
COPY . .
RUN npm audit
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

# Pré-Production (sem a pasta de testes e node_modules)
FROM test as pre-prod
RUN rm -rf ./tests && rm -rf ./node_modules

# Production Stage
FROM base as prod
COPY --from=pre-prod /app /app
HEALTHCHECK CMD curl http://127.0.0.1 || exit 1