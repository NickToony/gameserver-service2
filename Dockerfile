FROM node:20-alpine as builder
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copy source code
COPY . .

# Build
RUN yarn build

# Prune
RUN yarn install --production --ignore-scripts --prefer-offline




# Production image
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
EXPOSE 3000
CMD ["node", "dist/main"]