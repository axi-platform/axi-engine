FROM node:alpine 

# Install Yarn
RUN apk update
RUN apk add yarn

# Declare the directory to use for building
ENV build /opt/build

# Set the Application Directory and NODE_ENV to be `production`
ENV user app
ENV app /opt/app

# Create the work directory
RUN mkdir -p $app
WORKDIR $app

# Copy the source code
COPY . $app

# Install the dependencies
RUN yarn add --dev

# Build the production bundle with `next build`
ENV NODE_ENV production

# Build for Production
RUN yarn build

# Globally install PM2 to daemonize node
RUN yarn global add pm2

# Create the `app` user to run our application in
RUN adduser -D -g 'app' $user

# Prune Unnecessary devDependencies from Container
RUN npm prune --production

# Switch to the created `$user`
USER $user

# Expose Port 3001 only
EXPOSE 3001

# Invoke PM2
CMD pm2 start server.js --name "camp-backend"
