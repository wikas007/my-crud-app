FROM node:18.17.0-alpine

WORKDIR /usr/app

# Copy package.json and yarn.lock (or package-lock.json) to the working directory
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Expose the port that your app will run on
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
