# Use official Node.js slim image
FROM node:22-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript code
RUN npm run build

# Default: Start app
CMD ["npm", "run", "start"]
