FROM node:20-alpine AS builder

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL

ENV NODE_ENV production
WORKDIR /app

COPY ./package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]