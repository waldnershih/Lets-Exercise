# tell the docker to build the node image from DOCKER HUB
FROM node:16.13.2

# the working directory you want to run the node app in
RUN mkdir -p /usr/src/lets-exercise-api
WORKDIR /usr/src/lets-exercise-api

# copy from the current directory to the container
# COPY ./ ./
COPY package*.json /usr/src/lets-exercise-api


# In version 8.x and above use --omit=dev
RUN npm install --omit=dev

# Bundle app source
COPY . /usr/src/lets-exercise-api

# Build arguements
ARG NODE_VERSION=16.13.2

ENV NODE_VERSION $NODE_VERSION

USER node 

CMD [ "npm", "start" ]

EXPOSE 80