FROM node:18.15-alpine AS base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:18.15-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION 1

WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:18.15-alpine AS production

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER node

COPY --from=builder --chown=node:node /usr/src/app/next.config.mjs ./
COPY --from=builder --chown=node:node /usr/src/app/public ./public
COPY --from=builder --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=builder --chown=node:node /usr/src/app/.next/standalone ./
COPY --from=builder --chown=node:node /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
