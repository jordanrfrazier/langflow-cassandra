# syntax=docker/dockerfile:1
# Keep this syntax directive! It's used to enable Docker BuildKit

################################
# BUILDER-BASE
################################
FROM node:lts-bookworm-slim as builder-base
COPY src/frontend /frontend

RUN cd /frontend && npm install && npm run build

################################
# RUNTIME
################################
FROM nginxinc/nginx-unprivileged:stable-bookworm-perl as runtime

LABEL org.opencontainers.image.title=langflow-frontend
LABEL org.opencontainers.image.authors=['Langflow']
LABEL org.opencontainers.image.licenses=MIT
LABEL org.opencontainers.image.url=https://github.com/langflow-ai/langflow
LABEL org.opencontainers.image.source=https://github.com/langflow-ai/langflow

COPY --from=builder-base --chown=nginx /frontend/build /usr/share/nginx/html
COPY --chown=nginx ./docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx ./docker/frontend/start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh
ENTRYPOINT ["/start-nginx.sh"]