# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time args (set via Cloud Build substitution or --build-arg)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies first for layer caching
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else npm install; fi

COPY . .

# Build the Next.js app (standalone output)
RUN npm run build

# ---- Runtime Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Copy only the standalone output and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

CMD ["node", "server.js"]
