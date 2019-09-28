FROM node:8

RUN apt-get update && apt-get install -y graphicsmagick

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

ENV CHARCOAL_FACTOR=0.1

CMD ["node", "index.js"]

# docker run -v $(pwd)/in:/app/in -v $(pwd)/out:/app/out mta
# docker run -v $(pwd)/in:/app/in -v $(pwd)/out:/app/out --env CHARCOAL_FACTOR=10 mta