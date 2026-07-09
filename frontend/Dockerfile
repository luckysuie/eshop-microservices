# ==============================
# Stage 1: Build the React app
# ==============================
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# ==============================
# Stage 2: Serve with nginx
# ==============================
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built files from Stage 1
COPY --from=build /app/dist .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
