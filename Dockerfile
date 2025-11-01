# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /app

# speed & reproducibility
COPY package*.json ./
RUN npm ci

# if you use sharp/next-image on alpine
RUN apk add --no-cache libc6-compat

# copy source
COPY . .

# build Next.js (produces .next/standalone and .next/static)
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# If you use sharp/next-image on alpine
RUN apk add --no-cache libc6-compat

# copy the minimal runtime produced by standalone build
COPY --from=builder /app/.next/standalone ./
# static assets must be at the same path the server expects
COPY --from=builder /app/.next/static ./.next/static
# and your public folder if you have one
COPY --from=builder /app/public ./public

# run as non-root
USER node

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1

# The standalone server entry point:
CMD ["node", "server.js"]
