FROM node:9-alpine
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

ENV APP /opt/app
ENV NODE_ENV development

WORKDIR $APP

# Install system dependencies
RUN apk update && apk --no-cache add python g++ make

# Install node dependencies
COPY package.json yarn.lock /tmp/
ADD .yarn-cache.tgz /
RUN cd /tmp && yarn --pure-lockfile

# Setup workspace directory
RUN mkdir -p $APP && cd $APP && ln -s /tmp/node_modules

# Copy files into workspace
COPY package.json webpack.config.js $APP/
COPY src $APP/src

# Build the bundle
RUN npx webpack

# USER node
EXPOSE 3000

CMD ["yarn", "start"]
