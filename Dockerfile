# syntax=docker/dockerfile:1
ARG NODE_VERSION=20
ARG NGINX_VERSION=alpine

# Stage 1: Build
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
ARG REACT_APP_BASE_PATH=https://mydescent.ru/
ENV REACT_APP_BASE_PATH=${REACT_APP_BASE_PATH}
ENV REACT_APP_GENERATE_SOURCEMAP=false
RUN npm run build

# Stage 2: Serve
FROM nginx:${NGINX_VERSION}
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
