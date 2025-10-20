# Use Node.js 18 alpine image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose port 8888
EXPOSE 8888

# Start the application using Vite's preview server
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "8888"]