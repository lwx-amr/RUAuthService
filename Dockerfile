# Include node.js vresion to be added
FROM node:12

# Create app directory
WORKDIR /home/amr/Public/Career/Docker/rulogin

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY build ./build
COPY config ./config

# Choose port for service
EXPOSE 3002

# Commands to run app
CMD ["npm","run", "prod"]
