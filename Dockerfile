FROM node:16-alpine as build-app
ARG REACT_APP_PUBLIC_BACKEND_API
ARG REACT_APP_SENTRY_ENVIRONMENT
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_STORAGE_BUCKET_BASE_URL

ENV REACT_APP_PUBLIC_BACKEND_API=$REACT_APP_PUBLIC_BACKEND_API
ENV REACT_APP_SENTRY_ENVIRONMENT=$REACT_APP_SENTRY_ENVIRONMENT
ENV REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN
ENV REACT_APP_STORAGE_BUCKET_BASE_URL=$REACT_APP_STORAGE_BUCKET_BASE_URL

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine as server
COPY ./.docker/nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=build-app /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"