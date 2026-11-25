FROM node:20-alpine

WORKDIR /app

# Install build dependencies for Sharp native bindings
RUN apk add --no-cache vips-dev build-base python3

# Copy package definition and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]
