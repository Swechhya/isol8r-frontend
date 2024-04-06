# Use the official Node.js 16 image as the parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy the package files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application with Vite
RUN npm run build

# Expose React Port
EXPOSE 3000

# Run vite start
CMD ["npm", "run", "dev"]