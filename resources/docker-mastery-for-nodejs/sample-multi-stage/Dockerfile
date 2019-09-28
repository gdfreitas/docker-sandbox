# docker build -t multistage --target prod . && docker run multistage
FROM node:10-slim as prod
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY . .
CMD ["node", "./bin/www"]

# docker build -t multistage:dev --target dev . && docker run --init -p 3000:3000 multistage:dev
FROM prod as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["../node_modules/nodemon/bin/nodemon.js", "./bin/www", "--inspect=0.0.0.0:9229"]

# docker build -t multistage:test --target test . && docker run --init  multistage:test
FROM dev as test
ENV NODE_ENV=development
CMD ["npm", "test"]