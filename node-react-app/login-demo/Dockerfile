# Use a Node image to build the React application
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3002 for the frontend
EXPOSE 3002

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
