FROM --platform=linux/amd64 node:18-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV SKIP_ENV_VALIDATION 1

RUN npx prisma generate
RUN npm run build

FROM --platform=linux/amd64 node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
