# syntax=docker/dockerfile:1

# Override in Coolify: Build → Build Arguments → NODE_VERSION=22
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /app

# Classic Yarn v1 (matches yarn.lock format)
RUN corepack disable 2>/dev/null || true \
  && npm install -g yarn@1.22.22

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN NODE_ENV=production yarn build

FROM node:${NODE_VERSION}-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN corepack disable 2>/dev/null || true \
  && npm install -g yarn@1.22.22

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/build ./build

RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["yarn", "start"]
