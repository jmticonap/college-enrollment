FROM node:18-buster-slim

# Create app directory
WORKDIR /usr/src/app

ENV PORT = ${APP_PORT}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE $PORT
RUN npm run build

CMD ["npm","run", "prod"]
