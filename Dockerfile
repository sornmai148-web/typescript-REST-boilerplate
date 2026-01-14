# Use an official lightweight Node.js image
FROM node:24-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (Yarn's lock file)
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the project (assuming tsc is configured to output to 'dist')
RUN yarn build

# Expose the port (should match your app config, e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
