# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json for API
COPY api/package*.json ./api/

# Change to the /api directory
WORKDIR /app/api

# Install API dependencies
RUN npm install

# Change back to the /app directory
WORKDIR /app

# Copy package.json and package-lock.json for webapp
COPY webapp/package*.json ./webapp/

# Change to the /webapp directory
WORKDIR /app/webapp

# Install webapp dependencies
RUN npm install

# Change back to the /app directory
WORKDIR /app

# Copy the content of the local /api directory to the /app/api directory
COPY api /app/api/

# Copy the content of the local /webapp directory to the /app/webapp directory
COPY webapp /app/webapp/

# Expose the ports for API and webapp
EXPOSE 3001 3000

# Command to run your applications in development mode
CMD ["npm", "run", "dev"]
