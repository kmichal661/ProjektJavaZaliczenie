# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install serve globally
RUN npm install -g serve

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the dist folder using serve
CMD ["serve", "-s", "dist", "-l", "3000"]