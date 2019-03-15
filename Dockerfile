# stage 1
FROM node:10.13 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/ezTrackingApp /usr/share/nginx/html

# docker-machine ip default