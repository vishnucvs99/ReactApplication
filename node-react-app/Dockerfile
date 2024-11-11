# Backend Dockerfile

# Use a Node image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code (including routes and other subdirectories)
COPY . .

# Expose port 3000 for the backend
EXPOSE 3000

# Start the backend server
CMD ["node", "app.js"]
